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
            title: 'EXCELLENT',
            description: 'Your resume is highly optimized for ATS systems. It should pass through most automated screening processes with ease.',
            color: '#10b981', // Emerald
        };
    } else if (score >= 75) {
        return {
            title: 'VERY GOOD',
            description: 'Your resume is well-optimized for ATS. Minor improvements could make it even stronger.',
            color: '#d4af37', // Gold
        };
    } else if (score >= 60) {
        return {
            title: 'GOOD',
            description: 'Your resume has a decent ATS score. Check the detailed report for specific areas to improve.',
            color: '#3b82f6', // Blue
        };
    } else if (score >= 40) {
        return {
            title: 'NEEDS IMPROVEMENT',
            description: 'Your resume may face challenges with ATS systems. Review the recommendations in your email report.',
            color: '#f59e0b', // Amber
        };
    } else {
        return {
            title: 'REQUIRES ATTENTION',
            description: 'Your resume needs substantial optimization for ATS compatibility. Please review the detailed feedback sent to your email.',
            color: '#ef4444', // Red
        };
    }
};

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ result, emailSent, onAnalyzeAnother }) => {
    const interpretation = getScoreInterpretation(result.ats_score);
    const scoreAngle = (result.ats_score / 100) * 360;

    return (
        <div className="score-display">
            <div className="score-display__card glass-panel">
                <div className="score-display__header">
                    <h2 className="score-display__title">ANALYSIS COMPLETE</h2>
                    <div className="score-display__divider"></div>
                    <p className="score-display__subtitle">
                        Your resume has been successfully analyzed
                    </p>
                </div>

                {/* Score Circle */}
                <div className="score-display__score-container">
                    <div className="score-display__score-circle">
                        <svg className="score-display__svg" viewBox="0 0 200 200">
                            {/* Background Circle */}
                            <circle
                                cx="100"
                                cy="100"
                                r="90"
                                fill="none"
                                stroke="rgba(148, 163, 184, 0.2)"
                                strokeWidth="8"
                            />
                            {/* Progress Circle */}
                            <circle
                                cx="100"
                                cy="100"
                                r="90"
                                fill="none"
                                stroke="#d4af37"
                                strokeWidth="8"
                                strokeDasharray="565.48"
                                strokeDashoffset={565.48 - (565.48 * result.ats_score) / 100}
                                strokeLinecap="round"
                                transform="rotate(-90 100 100)"
                                className="score-display__progress-ring"
                            />
                        </svg>
                        <div className="score-display__score-inner">
                            <div className="score-display__score-value">
                                {result.ats_score}
                            </div>
                            <div className="score-display__score-label">ATS SCORE</div>
                        </div>
                    </div>
                </div>

                {/* Interpretation */}
                <div className="score-display__interpretation">
                    <h3 className="score-display__interpretation-title" style={{ color: interpretation.color }}>
                        {interpretation.title}
                    </h3>
                    <p className="score-display__interpretation-text">
                        {interpretation.description}
                    </p>
                </div>

                {/* Email Status */}
                {emailSent && (
                    <div className="score-display__email-status">
                        <div className="score-display__email-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                        </div>
                        <span className="score-display__email-text">
                            Detailed report sent to your email
                        </span>
                    </div>
                )}

                {/* Actions */}
                <div className="score-display__actions">
                    <button
                        onClick={onAnalyzeAnother}
                        className="score-display__button"
                    >
                        ANALYZE ANOTHER RESUME
                    </button>
                </div>
            </div>
        </div>
    );
};
