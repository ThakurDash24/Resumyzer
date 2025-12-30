import { useState } from 'react';
import type { AnalysisResult } from '../types';
import { sendAnalysisEmail } from '../services/emailService';

type AnalysisState =
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'success'
  | 'error';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export function useResumeAnalysis() {
  const [state, setState] = useState<AnalysisState>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (
    resume: File,
    email: string,
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

    try {
      const formData = new FormData();
      formData.append('resume', resume);
      formData.append('email', email);
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
      sendAnalysisEmail({
        email,
        atsScore: analysis.ats_score,
        summary: analysis.overall_summary,
      }).catch(() => {
        console.warn('Email failed but analysis succeeded');
      });

    } catch (err: any) {
      setError(
        err?.message || 'No response from server. Please try again.'
      );
      setState('error');
    }
  };

  const reset = () => {
    setState('idle');
    setResult(null);
    setError(null);
  };

  return {
    state,
    result,
    error,
    analyze,
    reset,
  };
}
