/**
 * Processing State Component
 * Shows loading spinner with fade-in/fade-out messages
 */

import React, { useState, useEffect } from 'react';
import { PROCESSING_MESSAGES } from '../../utils/processingMessages';
import './ProcessingState.css';

export const ProcessingState: React.FC = () => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Calculate total duration based on messages
        const totalDuration = PROCESSING_MESSAGES.reduce(
            (sum, msg) => sum + msg.duration,
            0
        );

        // Progress bar animation
        // We want to reach 96% over the course of the messages
        // Then stall until the actual process completes
        const targetProgress = 96;
        const updateInterval = 100; // Update every 100ms
        const steps = totalDuration / updateInterval;
        const incrementPerStep = targetProgress / steps;

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                // Stop at 96% and wait for actual completion
                if (prev >= 96) return 96;
                return Math.min(prev + incrementPerStep, 96);
            });
        }, updateInterval);

        // Message cycling
        let messageTimeout: number;

        const scheduleNextMessage = (index: number) => {
            if (index >= PROCESSING_MESSAGES.length) {
                // Loop back to start
                setCurrentMessageIndex(0);
                scheduleNextMessage(0);
                return;
            }

            const message = PROCESSING_MESSAGES[index];

            messageTimeout = window.setTimeout(() => {
                setCurrentMessageIndex((prev) => {
                    const nextIndex = prev + 1;
                    if (nextIndex >= PROCESSING_MESSAGES.length) {
                        return 0;
                    }
                    return nextIndex;
                });

                scheduleNextMessage(index + 1);
            }, message.duration);
        };

        scheduleNextMessage(0);

        // Cleanup
        return () => {
            clearInterval(progressInterval);
            clearTimeout(messageTimeout);
        };
    }, []);

    const currentMessage = PROCESSING_MESSAGES[currentMessageIndex];

    return (
        <div className="processing-state">
            <div className="processing-state__container glass-panel">
                <div className="processing-state__spinner-container">
                    <div className="processing-state__spinner" role="status" aria-label="Loading" />
                </div>

                <h2 className="processing-state__title">ANALYZING RESUME</h2>
                <div className="processing-state__divider"></div>
                <p className="processing-state__subtitle">
                    Our AI is reviewing your experience and skills
                </p>

                <div className="processing-state__messages">
                    <p
                        key={currentMessage.id}
                        className="processing-state__message"
                        style={{
                            animation: `fadeInOut ${currentMessage.duration}ms ease-in-out`,
                        }}
                    >
                        {currentMessage.text}
                    </p>
                </div>

                <div className="processing-state__progress">
                    <div className="processing-state__progress-bar">
                        <div
                            className="processing-state__progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="processing-state__progress-text">
                        {Math.round(progress)}% COMPLETE
                    </p>
                </div>
            </div>
        </div>
    );
};
