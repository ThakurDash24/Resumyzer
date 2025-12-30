/**
 * API Service Layer for RESUMYZER
 * Handles all backend communication with FastAPI
 */

import axios, { AxiosError } from 'axios';
import type { AnalyzeResumeRequest, AnalyzeResumeResponse, ApiError } from '../types';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TIMEOUT = 60000; // 60 seconds for file upload + processing

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Accept': 'application/json',
    },
});

/**
 * Analyzes a resume and sends report via email
 * @param request - Resume file, email, and optional job role
 * @returns Promise with ATS score and email confirmation
 */
export const analyzeResume = async (
    request: AnalyzeResumeRequest
): Promise<AnalyzeResumeResponse> => {
    try {
        // Prepare multipart/form-data
        const formData = new FormData();
        formData.append('resume', request.resume);
        formData.append('email', request.email);

        if (request.job_role) {
            formData.append('job_role', request.job_role);
        }

        // Make POST request
        const response = await apiClient.post<AnalyzeResumeResponse>(
            '/api/analyze-resume',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response.data;
    } catch (error) {
        // Handle axios errors
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ApiError>;

            if (axiosError.response) {
                // Server responded with error
                throw new Error(
                    axiosError.response.data?.detail ||
                    `Server error: ${axiosError.response.status}`
                );
            } else if (axiosError.request) {
                // Request made but no response
                throw new Error('No response from server. Please check if backend is running.');
            }
        }

        // Generic error
        throw new Error('Failed to analyze resume. Please try again.');
    }
};

/**
 * Health check endpoint (optional - for future use)
 */
export const checkBackendHealth = async (): Promise<boolean> => {
    try {
        await apiClient.get('/health');
        return true;
    } catch {
        return false;
    }
};
