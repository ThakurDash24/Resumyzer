/**
 * Error Display Component
 * Shows error messages with retry option
 */

import React from 'react';
import './ErrorDisplay.css';

interface ErrorDisplayProps {
    error: string;
    onRetry: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
    return (
        <div className="error-display">
            <div className="error-display__card">
                <div className="error-display__icon">❌</div>

                <h2 className="error-display__title">Analysis Failed</h2>

                <p className="error-display__message">
                    We encountered an error while analyzing your resume. Please try again.
                </p>

                <div className="error-display__details">
                    <p className="error-display__details-text">{error}</p>
                </div>

                <button
                    onClick={onRetry}
                    className="error-display__button"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};
