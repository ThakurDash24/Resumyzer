import { useEffect, useState } from "react";
import "./Header.css";

interface HeaderProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export default function Header({ isDarkMode, toggleTheme }: HeaderProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`main-header ${scrolled ? "scrolled" : ""}`}>
            <div className="header-inner">
                <span className="logo">RESUMYZER</span>

                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label="Toggle Dark Mode"
                >
                    {isDarkMode ? (
                        <span className="theme-icon">🌙</span> // Moon for Dark Mode (Current State)
                    ) : (
                        <span className="theme-icon">☀</span> // Sun for Light Mode (Current State)
                    )}
                </button>
            </div>
        </header>
    );
}
