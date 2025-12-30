import { useState } from 'react';
import type { AnalysisResult, AnalysisState } from '../types';
import { sendAnalysisEmail } from '../services/emailService';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export function useResumeAnalysis() {
  const [state, setState] = useState<AnalysisState>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const analyze = async (
    resume: File,
    email: string,
    phone: string,
    jobRole?: string
  ) => {
    if (!API_BASE) {
      setError('Backend URL not configured');
      setState('error');
      return;
    }

    setState('uploading');
    setError(null);
    setResult(null);
    setEmailSent(false);

    try {
      const formData = new FormData();
      formData.append('resume', resume);
      formData.append('email', email);
      if (phone) formData.append('phone', phone);
      if (jobRole) formData.append('job_role', jobRole);

      setState('processing');

      const response = await fetch(`${API_BASE}/api/analyze-resume`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      // ❌ Hard failure only if analysis is missing
      if (!response.ok && !data?.analysis) {
        throw new Error(data?.detail || 'Analysis failed');
      }

      const analysis: AnalysisResult = data.analysis ?? data;

      // ✅ UI SUCCESS
      setResult(analysis);
      setState('success');

      // ✅ EMAIL (FRONTEND-ONLY, NON-BLOCKING)
      // Determine target email: user input > extracted from resume
      const targetEmail = email || analysis.extracted_email;

      if (targetEmail) {
        // We don't await this to keep UI snappy, but we catch errors
        sendAnalysisEmail({
          email: targetEmail,
          phone,
          atsScore: analysis.ats_score,
          summary: analysis.overall_summary,
        })
          .then(() => {
            console.log("Email sent successfully to:", targetEmail);
            setEmailSent(true);
          })
          .catch((err) => {
            console.warn('Email failed but analysis succeeded', err);
          });
      } else {
        console.warn('No email provided or extracted. Skipping email report.');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'No response from server. Please try again.';
      setError(errorMessage);
      setState('error');
    }
  };

  const reset = () => {
    setState('idle');
    setResult(null);
    setError(null);
    setEmailSent(false);
  };

  return {
    state,
    result,
    error,
    emailSent,
    analyze,
    reset,
  };
}
