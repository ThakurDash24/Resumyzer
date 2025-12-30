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
        // Calculate total duration
        const totalDuration = PROCESSING_MESSAGES.reduce(
            (sum, msg) => sum + msg.duration,
            0
        );

        // Progress bar animation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) return prev;
                return prev + (100 / totalDuration) * 100;
            });
        }, 100);

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
            <div className="processing-state__container">
                <div className="processing-state__spinner" role="status" aria-label="Loading" />

                <h2 className="processing-state__title">Analyzing Your Resume</h2>
                <p className="processing-state__subtitle">
                    This may take a few moments. Please don't close this window.
                </p>

                <div className="processing-state__messages">
                    <p
                        key={currentMessage.id}
                        className="processing-state__message"
                        style={{
                            animation: `fadeInOut ${currentMessage.duration}ms var(--fade-timing)`,
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
                        {Math.round(progress)}% complete
                    </p>
                </div>
            </div>
        </div>
    );
};
