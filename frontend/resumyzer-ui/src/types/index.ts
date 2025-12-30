import type { AnalysisResult } from './analysis';
export * from './analysis';

export interface AnalyzeResumeResponse {
  analysis: AnalysisResult;
  email_sent: boolean;
  message: string;
}

export interface FormErrors {
  resume?: string;
  email?: string;
  phone?: string;
  jobRole?: string;
}

export interface ApiError {
  detail: string;
}

export type AnalysisState = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export interface ProcessingMessage {
  id: number;
  text: string;
  duration: number;
}