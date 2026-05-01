import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Pill from '../components/Pill';
import SummaryDisplay from '../components/SummaryDisplay';
import { login, getPharmacistQueue, reviewSession, getPharmacistStats } from '../api/client';

const severityConfig = {
    MILD: { label: 'Mild', className: 'severity-mild' },
    MODERATE: { label: 'Moderate', className: 'severity-moderate' },
    SEVERE: { label: 'Severe', className: 'severity-severe' },
};

const conditionIcons = {
    'earache': '👂',
    'sore-throat': '🗣️',
    'sinusitis': '🤧',
    'conjunctivitis': '👁️',
    'uti': '💧',
    'shingles': '🔴',
    'impetigo': '🩹',
    'hair-loss': '💇',
    'erectile-dysfunction': '💊',
    'acne': '🧴',
    'acid-reflux': '🔥',
    'hay-fever': '🌿',
    'period-pain': '🩸',
};

function getInitials(name) {
    if (!name) return '??';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

export default function PharmacistDashboard() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pharmacist, setPharmacist] = useState(null);
    const [email, setEmail] = useState('sarah.mitchell@nhs.net');
    const [password, setPassword] = useState('pharmacy123');
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    const [queue, setQueue] = useState([]);
    const [stats, setStats] = useState({ pending: 0, reviewed: 0, totalToday: 0, averageSUSScore: null });
    const [selectedSession, setSelectedSession] = useState(null);
    const [queueLoading, setQueueLoading] = useState(false);
    const [reviewingId, setReviewingId] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setLoginError('');

        try {
            const data = await login(email, password);
            setPharmacist(data.pharmacist);
            setIsAuthenticated(true);
        } catch (err) {
            setLoginError(err.response?.data?.error || 'Login failed. Please try again.');
        } finally {
            setLoginLoading(false);
        }
    };

    const fetchQueue = useCallback(async () => {
        setQueueLoading(true);
        try {
            const data = await getPharmacistQueue();
            setQueue(data.queue || []);
        } catch (err) {
            console.error('Failed to fetch queue:', err);
        } finally {
            setQueueLoading(false);
        }
    }, []);

    const fetchStats = useCallback(async () => {
        try {
            const data = await getPharmacistStats();
            setStats(data);
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
    }, []);

    const handleReview = async (sessionId) => {
        setReviewingId(sessionId);
        try {
            await reviewSession(sessionId);
            // Update local state
            setQueue(prev => prev.map(s =>
                s.id === sessionId
                    ? { ...s, status: 'reviewed', reviewedAt: new Date().toISOString() }
                    : s
            ));
            fetchStats();
        } catch (err) {
            console.error('Failed to mark reviewed:', err);
        } finally {
            setReviewingId(null);
        }
    };

    const handleStartSUS = (session) => {
        navigate('/sus-evaluation', {
            state: {
                sessionId: session.id,
                pharmacistId: pharmacist?.id
            }
        });
    };

    // Fetch queue and stats upon authentication
    useEffect(() => {
        if (isAuthenticated) {
            fetchQueue();
            fetchStats();
        }
    }, [isAuthenticated, fetchQueue, fetchStats]);

    // Auto-refresh every 30 seconds
    useEffect(() => {
        if (!isAuthenticated) return;
        const interval = setInterval(() => {
            fetchQueue();
            fetchStats();
        }, 30000);
        return () => clearInterval(interval);
    }, [isAuthenticated, fetchQueue, fetchStats]);

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="pharmacist-login">
                <div className="login-card">
                    <div className="login-header">
                        <div className="login-icon">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <rect width="32" height="32" rx="8" fill="#003087" />
                                <path d="M10 16h12M16 10v12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h2>Pharmacist Login</h2>
                        <p>Sign in to access the clinical dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="login-form">
                        {loginError && <div className="login-error">{loginError}</div>}

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="pharmacist@nhs.net"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="form-input"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={loginLoading}>
                            {loginLoading ? (
                                <>
                                    <span className="spinner spinner-sm"></span>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                        <div className="login-hint">
                            <p><strong>Demo credentials:</strong></p>
                            <p>Email: sarah.mitchell@nhs.net</p>
                            <p>Password: pharmacy123</p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // Dashboard
    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div>
                    <h1 className="page-title">Pharmacist Dashboard</h1>
                    <p className="page-subtitle">Welcome back, {pharmacist?.name}</p>
                </div>
                <button className="btn btn-secondary" onClick={() => {
                    localStorage.removeItem('pharmacare_token');
                    setIsAuthenticated(false);
                }}>
                    Sign Out
                </button>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card stat-pending">
                    <div className="stat-card-icon">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="2" />
                            <path d="M11 7v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="stat-card-value">{stats.pending}</div>
                    <div className="stat-card-label">Pending Reviews</div>
                </div>
                <div className="stat-card stat-reviewed">
                    <div className="stat-card-icon">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M6 11l3.5 3.5L16 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="stat-card-value">{stats.reviewed}</div>
                    <div className="stat-card-label">Reviewed</div>
                </div>
                <div className="stat-card stat-bookings">
                    <div className="stat-card-icon">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M7 3v3m8-3v3M4 9h14M5 4h12a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="stat-card-value">{stats.totalToday}</div>
                    <div className="stat-card-label">Today's Sessions</div>
                </div>
                <div className="stat-card stat-completed">
                    <div className="stat-card-icon">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <rect x="3" y="3" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                            <path d="M7 11h8M11 7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="stat-card-value">{stats.averageSUSScore !== null ? stats.averageSUSScore : '—'}</div>
                    <div className="stat-card-label">Avg SUS Score</div>
                </div>
            </div>

            {/* Patient Queue */}
            <div className="queue-section">
                <div className="queue-header">
                    <h2>Patient Queue</h2>
                    <button className="btn btn-secondary btn-sm" onClick={() => { fetchQueue(); fetchStats(); }} disabled={queueLoading}>
                        {queueLoading ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>

                {queueLoading && queue.length === 0 ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading queue...</p>
                    </div>
                ) : queue.length === 0 ? (
                    <div className="empty-state">
                        <p>No patients in queue</p>
                    </div>
                ) : (
                    <div className="queue-list">
                        {queue.map((session) => (
                            <div key={session.id} className={`queue-item ${selectedSession?.id === session.id ? 'queue-item-expanded' : ''}`}>
                                <div className="queue-item-main">
                                    <div className="queue-item-icon">
                                        {conditionIcons[session.conditionId] || '📋'}
                                    </div>
                                    <div className="queue-item-info">
                                        <div className="queue-item-name">
                                            <span className="patient-initials">{getInitials(session.patientName)}</span>
                                            {session.patientName || 'Anonymous Patient'}
                                        </div>
                                        <div className="queue-item-condition">
                                            {session.conditionName || session.conditionId}
                                        </div>
                                        <div className="queue-item-time">
                                            {timeAgo(session.createdAt)}
                                        </div>
                                    </div>
                                    <div className="queue-item-badges">
                                        {session.severityLevel && (
                                            <span className={`severity-badge ${severityConfig[session.severityLevel]?.className || ''}`}>
                                                {severityConfig[session.severityLevel]?.label || session.severityLevel}
                                            </span>
                                        )}
                                        <Pill status={session.status} />
                                    </div>
                                    <div className="queue-item-actions">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => setSelectedSession(
                                                selectedSession?.id === session.id ? null : session
                                            )}
                                        >
                                            {selectedSession?.id === session.id ? 'Hide Summary' : 'View Summary'}
                                        </button>
                                        {session.status === 'pending' && (
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleReview(session.id)}
                                                disabled={reviewingId === session.id}
                                            >
                                                {reviewingId === session.id ? 'Marking...' : 'Mark Reviewed'}
                                            </button>
                                        )}
                                        {session.status === 'reviewed' && (
                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => handleStartSUS(session)}
                                            >
                                                Start SUS Evaluation
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {selectedSession?.id === session.id && (
                                    <div className="queue-item-summary">
                                        {/* Red flags alert */}
                                        {session.redFlags && session.redFlags.length > 0 && (
                                            <div className="red-flags-alert red-flags-compact">
                                                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                                                    <path d="M9 1.5L1 16h16L9 1.5z" fill="#b30000" opacity="0.12" />
                                                    <path d="M9 1.5L1 16h16L9 1.5z" stroke="#b30000" strokeWidth="1.5" strokeLinejoin="round" />
                                                    <path d="M9 7v3.5M9 13h.007" stroke="#b30000" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                                <div>
                                                    <strong>Red Flags:</strong> {session.redFlags.join(', ')}
                                                </div>
                                            </div>
                                        )}

                                        {/* Extracted symptoms tags */}
                                        {session.extractedSymptoms && (
                                            <div className="nlp-extracted-details nlp-details-compact">
                                                {session.extractedSymptoms.bodyLocation && (
                                                    <span className="nlp-tag">📍 {session.extractedSymptoms.bodyLocation}</span>
                                                )}
                                                {session.extractedSymptoms.duration && (
                                                    <span className="nlp-tag">⏱️ {session.extractedSymptoms.duration.raw}</span>
                                                )}
                                                {session.extractedSymptoms.painScore !== null && session.extractedSymptoms.painScore !== undefined && (
                                                    <span className="nlp-tag">💊 Pain: {session.extractedSymptoms.painScore}/10</span>
                                                )}
                                            </div>
                                        )}

                                        <SummaryDisplay
                                            summary={session.summary}
                                            answers={session.answers}
                                            conditionName={session.conditionName}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
