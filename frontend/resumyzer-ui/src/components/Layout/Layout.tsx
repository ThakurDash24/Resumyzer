import React from 'react';
import Header from './Header';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, isDarkMode, toggleTheme }) => {
    return (
        <div className={`layout ${isDarkMode ? 'dark-mode' : ''}`}>
            <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

            <main className="layout__main">
                {children}
            </main>

            <footer className="layout__footer">
                <div className="container">
                    <div className="layout__footer-content">
                        <div className="layout__footer-brand">
                            <span className="layout__footer-tdash">A TDASH PRODUCTION</span>
                        </div>

                        <p className="layout__footer-credit">
                            Developed by <span className="layout__footer-name">Thakur Asutosh Dash</span>
                        </p>

                        <div className="layout__footer-links">
                            <a
                                href="https://tdash24.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="layout__footer-link"
                            >
                                Portfolio
                            </a>
                            <a
                                href="https://www.linkedin.com/in/thakur-asutosh-dash-a6965922a/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="layout__footer-link"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/ThakurDash24"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="layout__footer-link"
                            >
                                GitHub
                            </a>
                        </div>

                        <p className="layout__footer-copyright">
                            &copy; {new Date().getFullYear()} Resumyzer. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
