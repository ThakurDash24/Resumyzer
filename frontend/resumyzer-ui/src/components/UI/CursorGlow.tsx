import React, { useEffect, useState } from 'react';
import './CursorGlow.css';

export const CursorGlow: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updatePosition);

        return () => window.removeEventListener('mousemove', updatePosition);
    }, []);

    return (
        <div
            className="cursor-glow"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        />
    );
};
