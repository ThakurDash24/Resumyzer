/**
 * Layout Component
 * Provides consistent page structure with header and footer
 */

import React from 'react';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <header className="layout__header">
                <div className="container">
                    <div className="layout__header-content">
                        <div>
                            <h1 className="layout__logo">RESUMYZER</h1>
                            <p className="layout__tagline">ATS-Optimized Resume Analysis</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="layout__main">
                <div className="container">
                    {children}
                </div>
            </main>

            <footer className="layout__footer">
                <div className="container">
                    <p className="layout__footer-text">
                        © {new Date().getFullYear()} RESUMYZER. All rights reserved.
                    </p>
                    <p className="layout__footer-text">
                        Powered by advanced ATS analysis technology
                    </p>
                </div>
            </footer>
        </div>
    );
};
