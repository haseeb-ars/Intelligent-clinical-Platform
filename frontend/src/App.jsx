import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import QuestionnairePage from './pages/QuestionnairePage';
import SummaryPage from './pages/SummaryPage';
import BookingPage from './pages/BookingPage';
import PharmacistDashboard from './pages/PharmacistDashboard';
import SUSEvaluationPage from './pages/SUSEvaluationPage';

export default function App() {
    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/questionnaire/:conditionId" element={<QuestionnairePage />} />
                    <Route path="/summary/:conditionId" element={<SummaryPage />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/pharmacist" element={<PharmacistDashboard />} />
                    <Route path="/sus-evaluation" element={<SUSEvaluationPage />} />
                </Routes>
            </main>
            <footer className="footer">
                <div className="footer-inner">
                    <p>© 2026 PharmaCare AI — NHS Pharmacy First Service</p>
                    <p className="footer-disclaimer">This platform is for clinical decision support only. Not a substitute for professional medical advice.</p>
                </div>
            </footer>
        </div>
    );
}
