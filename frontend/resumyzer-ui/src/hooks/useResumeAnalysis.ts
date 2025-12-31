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
          // Backend returns 'summary' in the top-level response, but internal type has 'overall_summary'
          summary: (analysis as any).summary || analysis.overall_summary,
          strengths: (analysis as any).strengths || analysis.strengths,
          weaknesses: (analysis as any).missing_or_weak_areas || analysis.missing_or_weak_areas,
          suggestions: (analysis as any).improvement_suggestions || analysis.improvement_suggestions,
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
      console.error("Analysis failed:", err);
      
      // Fallback result for server busy/crash scenarios
      const fallbackResult: AnalysisResult = {
        ats_score: 0,
        overall_summary: "Our servers are currently experiencing high traffic or are temporarily unavailable.",
        strengths: [],
        missing_or_weak_areas: [],
        ats_keyword_gaps: [],
        improvement_suggestions: [],
        structure_feedback: [],
        final_recommendation: "Please try again later.",
        is_fallback: true,
        extracted_email: email
      };

      setResult(fallbackResult);
      setState('success');
      // We do NOT set error state here, so the UI shows the ScoreDisplay with the fallback message
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
