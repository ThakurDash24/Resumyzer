import React from 'react';
import './LuxuryBackground.css';

export const LuxuryBackground: React.FC = () => {
    return (
        <div className="luxury-background">
            <div className="luxury-orb luxury-orb--1"></div>
            <div className="luxury-orb luxury-orb--2"></div>
            <div className="luxury-orb luxury-orb--3"></div>
            <div className="luxury-grid"></div>
        </div>
    );
};
