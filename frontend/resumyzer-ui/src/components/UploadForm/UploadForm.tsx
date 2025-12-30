/**
 * Upload Form Component
 * Handles resume upload, email input, and job role selection
 */

import React, { useState, useRef } from 'react';
import { validateForm, formatFileSize } from '../../utils/validation';
import type { FormErrors } from '../../types';
import './UploadForm.css';

interface UploadFormProps {
    onSubmit: (resume: File, email: string, jobRole?: string) => void;
    isDisabled?: boolean;
}

const JOB_ROLES = [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'UX/UI Designer',
    'Marketing Manager',
    'Business Analyst',
    'DevOps Engineer',
    'Sales Representative',
    'Other',
];

export const UploadForm: React.FC<UploadFormProps> = ({ onSubmit, isDisabled = false }) => {
    const [resume, setResume] = useState<File | null>(null);
    const [email, setEmail] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setResume(file);

        // Clear resume error if file is selected
        if (file && errors.resume) {
            setErrors(prev => ({ ...prev, resume: undefined }));
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);

        // Clear email error on change
        if (errors.email) {
            setErrors(prev => ({ ...prev, email: undefined }));
        }
    };

    const handleJobRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setJobRole(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        const validationErrors = validateForm(resume, email, jobRole);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Submit form
        if (resume) {
            onSubmit(resume, email, jobRole || undefined);
        }
    };

    const handleLabelClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="upload-form">
            <h2 className="upload-form__title">Analyze Your Resume</h2>
            <p className="upload-form__description">
                Upload your resume and get instant ATS compatibility score with detailed feedback
            </p>

            <div className="upload-form__card">
                <form onSubmit={handleSubmit}>
                    {/* Resume Upload */}
                    <div className="form-group">
                        <label className="form-label form-label--required">
                            Resume (PDF)
                        </label>

                        <div className="file-upload">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="file-upload__input"
                                id="resume-upload"
                                disabled={isDisabled}
                            />

                            <div
                                className={`file-upload__label ${resume ? 'file-upload__label--has-file' : ''
                                    } ${errors.resume ? 'file-upload__label--error' : ''}`}
                                onClick={handleLabelClick}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleLabelClick();
                                    }
                                }}
                            >
                                {resume ? (
                                    <>
                                        <div className="file-upload__icon">📄</div>
                                        <div className="file-upload__filename">{resume.name}</div>
                                        <div className="file-upload__filesize">
                                            {formatFileSize(resume.size)}
                                        </div>
                                        <div className="file-upload__subtext" style={{ marginTop: '8px' }}>
                                            Click to change file
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="file-upload__icon">📤</div>
                                        <div className="file-upload__text">
                                            Click to upload or drag and drop
                                        </div>
                                        <div className="file-upload__subtext">
                                            PDF only (Max 10MB)
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {errors.resume && (
                            <span className="form-error">{errors.resume}</span>
                        )}
                    </div>

                    {/* Email Input */}
                    <div className="form-group">
                        <label htmlFor="email" className="form-label form-label--required">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="your.email@example.com"
                            className={`text-input ${errors.email ? 'text-input--error' : ''}`}
                            disabled={isDisabled}
                        />
                        <span className="form-hint">
                            We'll send your detailed report to this email
                        </span>
                        {errors.email && (
                            <span className="form-error">{errors.email}</span>
                        )}
                    </div>

                    {/* Job Role Selection */}
                    <div className="form-group">
                        <label htmlFor="job-role" className="form-label">
                            Target Job Role (Optional)
                        </label>
                        <select
                            id="job-role"
                            value={jobRole}
                            onChange={handleJobRoleChange}
                            className="select-input"
                            disabled={isDisabled}
                        >
                            <option value="">Select a role...</option>
                            {JOB_ROLES.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                        <span className="form-hint">
                            Help us provide role-specific recommendations
                        </span>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isDisabled}
                    >
                        Analyze Resume
                    </button>
                </form>
            </div>
        </div>
    );
};
