/**
 * Validation utilities for form inputs
 */

import type { FormErrors } from '../types';

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates PDF file
 */
export const isValidPDF = (file: File | null): boolean => {
    if (!file) return false;

    if (file.type !== 'application/pdf') return false;

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) return false;

    return true;
};

/**
 * Validates the entire form
 */
export const validateForm = (
    resume: File | null,
    email: string,
    jobRole?: string
): FormErrors => {
    const errors: FormErrors = {};

    // 🔒 Explicit no-op usage to satisfy TypeScript
    void jobRole;

    // Validate resume
    if (!resume) {
        errors.resume = 'Please select a PDF file';
    } else if (!isValidPDF(resume)) {
        if (resume.type !== 'application/pdf') {
            errors.resume = 'Only PDF files are accepted';
        } else {
            errors.resume = 'File size must be less than 10MB';
        }
    }

    // Validate email
    if (!email.trim()) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
        errors.email = 'Please enter a valid email address';
    }

    return errors;
};

/**
 * Formats file size for display
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
