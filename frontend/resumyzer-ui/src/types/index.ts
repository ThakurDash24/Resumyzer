/**
 * Type definitions for RESUMYZER application
 */

// API Request payload
export interface AnalyzeResumeRequest {
  resume: File;
  email: string;
  job_role?: string;
}

// API Response structure
export interface AnalyzeResumeResponse {
  ats_score: number;
  email_sent: boolean;
  message: string;
  analysis_id?: string;
}

// API Error response
export interface ApiError {
  detail: string;
  status?: number;
}

// Application state for resume analysis
export type AnalysisState = 
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'success'
  | 'error';

// Processing messages that fade in/out
export interface ProcessingMessage {
  id: number;
  text: string;
  duration: number; // milliseconds
}

// Form validation errors
export interface FormErrors {
  resume?: string;
  email?: string;
  job_role?: string;
}
