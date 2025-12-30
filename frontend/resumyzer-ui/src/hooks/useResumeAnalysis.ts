/**
 * Custom hook for managing resume analysis state and logic
 */

import { useState } from 'react';
import { analyzeResume } from '../services/api';
import type { AnalysisState, AnalyzeResumeResponse } from '../types';

interface UseResumeAnalysisReturn {
    state: AnalysisState;
    result: AnalyzeResumeResponse | null;
    error: string | null;
    analyze: (resume: File, email: string, jobRole?: string) => Promise<void>;
    reset: () => void;
}

export const useResumeAnalysis = (): UseResumeAnalysisReturn => {
    const [state, setState] = useState<AnalysisState>('idle');
    const [result, setResult] = useState<AnalyzeResumeResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const analyze = async (
        resume: File,
        email: string,
        jobRole?: string
    ): Promise<void> => {
        try {
            // Reset previous state
            setError(null);
            setResult(null);

            // Start processing
            setState('uploading');

            // Simulate upload phase (brief delay)
            await new Promise(resolve => setTimeout(resolve, 500));

            setState('processing');

            // Call API
            const response = await analyzeResume({
                resume,
                email,
                job_role: jobRole,
            });

            // Success
            setResult(response);
            setState('success');

        } catch (err) {
            // Error handling
            const errorMessage = err instanceof Error
                ? err.message
                : 'An unexpected error occurred';

            setError(errorMessage);
            setState('error');
        }
    };

    const reset = (): void => {
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
};
