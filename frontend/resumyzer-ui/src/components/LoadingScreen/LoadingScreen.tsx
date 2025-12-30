import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
    onComplete: () => void;
    isDarkMode: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, isDarkMode }) => {
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Start fade out after 2.5 seconds
        const timer = setTimeout(() => {
            setIsFading(true);

            // Trigger onComplete after transition finishes (0.8s)
            setTimeout(onComplete, 800);
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className={`loading-screen ${isDarkMode ? 'dark-mode' : ''} ${isFading ? 'loading-screen--hidden' : ''}`}>
            <div className="loading-screen__content">
                <h1 className="loading-screen__title">RESUMYZER</h1>
                <div className="loading-screen__line"></div>
                <p className="loading-screen__subtitle">A <span className="loading-screen__gold-text">TDASH</span> PRODUCTION</p>
            </div>
        </div>
    );
};
