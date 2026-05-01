import React from 'react';
import ConditionCard from '../components/ConditionCard';
import { conditions, getConditionsByCategory } from '../data/conditions';

export default function LandingPage() {
    const categories = getConditionsByCategory();

    return (
        <div className="landing-page">
            {/* Hero */}
            <section className="hero">
                <div className="hero-bg-shapes">
                    <div className="hero-shape hero-shape-1"></div>
                    <div className="hero-shape hero-shape-2"></div>
                    <div className="hero-shape hero-shape-3"></div>
                </div>
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="hero-badge-dot"></span>
                        NHS Pharmacy First Service
                    </div>
                    <h1 className="hero-title">
                        Smart pharmacy care,<br />
                        <span className="hero-title-gradient">powered by AI</span>
                    </h1>
                    <p className="hero-subtitle">
                        Answer a few questions about your symptoms. Our AI generates a clinical summary for your pharmacist — faster, smarter consultations.
                    </p>
                    <div className="hero-metrics">
                        <div className="hero-metric">
                            <div className="hero-metric-value">13</div>
                            <div className="hero-metric-label">Conditions</div>
                        </div>
                        <div className="hero-metric-divider"></div>
                        <div className="hero-metric">
                            <div className="hero-metric-value">~3 min</div>
                            <div className="hero-metric-label">Assessment</div>
                        </div>
                        <div className="hero-metric-divider"></div>
                        <div className="hero-metric">
                            <div className="hero-metric-value">Free</div>
                            <div className="hero-metric-label">NHS Service</div>
                        </div>
                    </div>
                    <a href="#conditions" className="hero-cta">
                        <span>Start Your Assessment</span>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M5 9h8m0 0L9.5 5.5M13 9l-3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </section>

            {/* Conditions by Category */}
            <section className="conditions-section" id="conditions">
                {Object.entries(categories).map(([category, conditionsList]) => (
                    <div key={category} className="category-group">
                        <div className="category-header">
                            <h2 className="category-title">{category}</h2>
                            <span className="category-count">{conditionsList.length} conditions</span>
                        </div>
                        <div className="conditions-grid">
                            {conditionsList.map((condition) => (
                                <ConditionCard key={condition.id} condition={condition} />
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* Features */}
            <section className="features-section">
                <div className="features-header">
                    <h2 className="features-title">How it works</h2>
                    <p className="features-subtitle">Three simple steps to better pharmacy care</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-number">01</div>
                        <h3>Select & Answer</h3>
                        <p>Choose your condition and answer smart clinical questions tailored to your symptoms.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-number">02</div>
                        <h3>AI Summary</h3>
                        <p>Our AI analyses your responses and generates a structured clinical summary in seconds.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-number">03</div>
                        <h3>Book & Consult</h3>
                        <p>Book a pharmacist consultation and get expert advice based on your personalised summary.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
