import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();
    const isPharmacist = location.pathname === '/pharmacist';

    return (
        <header className="header">
            <div className="header-inner">
                <Link to="/" className="header-logo">
                    <div className="header-logo-icon">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <rect width="28" height="28" rx="6" fill="#003087" />
                            <path d="M8 14h12M14 8v12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="header-logo-text">
                        <span className="header-logo-name">PharmaCare</span>
                        <span className="header-logo-ai">AI</span>
                    </div>
                </Link>

                <nav className="header-nav">
                    <span className="header-badge">NHS Pharmacy First</span>
                    {!isPharmacist ? (
                        <Link to="/pharmacist" className="header-pharmacist-btn">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M9 2a3 3 0 100 6 3 3 0 000-6zM4 14c0-2.21 2.24-4 5-4s5 1.79 5 4v1H4v-1z" fill="currentColor" />
                            </svg>
                            Pharmacist View
                        </Link>
                    ) : (
                        <Link to="/" className="header-pharmacist-btn">
                            ← Patient View
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
