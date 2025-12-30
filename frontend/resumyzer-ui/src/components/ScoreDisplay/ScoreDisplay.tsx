/**
 * Score Display Component
 * Shows ATS score with visual feedback and email confirmation
 */

import React from 'react';
import type { AnalysisResult } from '../../types';
import './ScoreDisplay.css';

interface ScoreDisplayProps {
    result: AnalysisResult;
    emailSent?: boolean;
    onAnalyzeAnother: () => void;
}

interface ScoreInterpretation {
    title: string;
    description: string;
    color: string;
}

const getScoreInterpretation = (score: number): ScoreInterpretation => {
    if (score >= 90) {
        return {
            title: 'Excellent!',
            description: 'Your resume is highly optimized for ATS systems. It should pass through most automated screening processes with ease.',
            color: 'var(--color-success)',
        };
    } else if (score >= 75) {
        return {
            title: 'Very Good',
            description: 'Your resume is well-optimized for ATS. Minor improvements could make it even stronger.',
            color: 'var(--color-primary-600)',
        };
    } else if (score >= 60) {
        return {
            title: 'Good',
            description: 'Your resume has a decent ATS score. Check the detailed report for specific areas to improve.',
            color: 'var(--color-info)',
        };
    } else if (score >= 40) {
        return {
            title: 'Needs Improvement',
            description: 'Your resume may face challenges with ATS systems. Review the recommendations in your email report.',
            color: 'var(--color-warning)',
        };
    } else {
        return {
            title: 'Significant Improvements Needed',
            description: 'Your resume needs substantial optimization for ATS compatibility. Please review the detailed feedback sent to your email.',
            color: 'var(--color-error)',
        };
    }
};

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ result, emailSent, onAnalyzeAnother }) => {
    const interpretation = getScoreInterpretation(result.ats_score);
    const scoreAngle = (result.ats_score / 100) * 360;

    return (
        <div className="score-display">
            <div className="score-display__card">
                <div className="score-display__icon">✅</div>

                <h2 className="score-display__title">Analysis Complete!</h2>
                <p className="score-display__subtitle">
                    Your resume has been analyzed successfully
                </p>

                {/* Score Circle */}
                <div className="score-display__score-container">
                    <div className="score-display__score-circle">
                        <div
                            className="score-display__score-bg"
                            style={{ '--score-angle': `${scoreAngle}deg` } as React.CSSProperties}
                        />
                        <div className="score-display__score-inner">
                            <div className="score-display__score-value">
                                {result.ats_score}
                            </div>
                            <div className="score-display__score-label">ATS Score</div>
                        </div>
                    </div>
                </div>

                {/* Interpretation */}
                <div
                    className="score-display__interpretation"
                    style={{ '--interpretation-color': interpretation.color } as React.CSSProperties}
                >
                    <h3 className="score-display__interpretation-title">
                        {interpretation.title}
                    </h3>
                    <p className="score-display__interpretation-text">
                        {interpretation.description}
                    </p>
                </div>

                {/* Email Status */}
                {emailSent && (
                    <div className="score-display__email-status">
                        <span className="score-display__email-icon">📧</span>
                        <span className="score-display__email-text">
                            Detailed report sent to your email
                        </span>
                    </div>
                )}

                {/* Actions */}
                <div className="score-display__actions">
                    <button
                        onClick={onAnalyzeAnother}
                        className="score-display__button score-display__button--primary"
                    >
                        Analyze Another Resume
                    </button>
                </div>
            </div>
        </div>
    );
};
