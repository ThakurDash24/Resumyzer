/**
 * Upload Form Component
 * Handles resume upload, email input, and job role selection
 */

import React, { useState, useRef, useEffect } from 'react';
import { validateForm, formatFileSize } from '../../utils/validation';
import type { FormErrors } from '../../types';
import './UploadForm.css';

interface UploadFormProps {
    onSubmit: (resume: File, email: string, phone: string, jobRole?: string) => void;
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
    const [phone, setPhone] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    const fileInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // Mouse tracking for glass panels
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const panels = document.querySelectorAll('.glass-panel');
            panels.forEach((panel) => {
                const rect = panel.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                (panel as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
                (panel as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

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

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
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
            onSubmit(resume, email, phone, jobRole || undefined);
        }
    };

    const handleLabelClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="upload-page">
            <header className="upload-page__header">
                <h2 className="upload-page__title">Analyze Your Resume</h2>
                <p className="upload-page__subtitle">
                    Unlock your potential with AI-driven insights.
                </p>
            </header>

            <form ref={formRef} onSubmit={handleSubmit} className="upload-page__form">

                {/* Section 1: Resume Upload */}
                <div className="section-wrapper">
                    <h3 className="section-title">01. Upload Resume</h3>
                    <section className="form-section glass-panel">
                        <div className="form-group">
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
                                            {/* Removed emoji as requested */}
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
                    </section>
                </div>

                {/* Section 2: Contact Information */}
                <div className="section-wrapper">
                    <h3 className="section-title">02. Contact Details</h3>
                    <section className="form-section glass-panel">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email Address (Optional)
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="your.email@example.com"
                                    className={`form-input ${errors.email ? 'text-input--error' : ''}`}
                                    disabled={isDisabled}
                                />
                                <span className="form-hint">
                                    We'll send your detailed report here.
                                </span>
                                {errors.email && (
                                    <span className="form-error">{errors.email}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">
                                    Phone Number (Optional)
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    placeholder="+1 (555) 000-0000"
                                    className="form-input"
                                    disabled={isDisabled}
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Section 3: Professional Details */}
                <div className="section-wrapper">
                    <h3 className="section-title">03. Professional Role</h3>
                    <section className="form-section glass-panel">
                        <div className="form-group">
                            <label htmlFor="job-role" className="form-label">
                                Target Job Role (Optional)
                            </label>
                            <div className="select-wrapper">
                                <select
                                    id="job-role"
                                    value={jobRole}
                                    onChange={handleJobRoleChange}
                                    className="form-input form-select"
                                    disabled={isDisabled}
                                >
                                    <option value="">Select a role...</option>
                                    {JOB_ROLES.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <span className="form-hint">
                                Helps us provide role-specific recommendations.
                            </span>
                        </div>
                    </section>
                </div>

                {/* Submit Action */}
                <div className="form-actions">
                    <button
                        type="submit"
                        className="submit-btn btn-luxury"
                        disabled={isDisabled || Object.keys(errors).length > 0}
                    >
                        {isDisabled ? 'Analyzing...' : 'Analyze Resume'}
                    </button>
                </div>

            </form>
        </div>
    );
};
