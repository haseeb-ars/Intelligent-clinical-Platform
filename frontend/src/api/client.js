import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://intelligent-clinical-platform.onrender.com/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor — add auth token if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('pharmacare_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor — handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('pharmacare_token');
        }
        return Promise.reject(error);
    }
);

// --- API Functions ---

export async function generateSummary(conditionId, conditionName, answers) {
    const { data } = await api.post('/ai/summary', { conditionId, conditionName, answers });
    return data;
}

export async function getAvailableSlots(date) {
    const { data } = await api.get('/bookings/slots', { params: { date } });
    return data;
}

export async function createBooking(bookingData) {
    const { data } = await api.post('/bookings', bookingData);
    return data;
}

export async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.token) {
        localStorage.setItem('pharmacare_token', data.token);
    }
    return data;
}

export async function getConditions() {
    const { data } = await api.get('/conditions');
    return data;
}

// --- Pharmacist Queue API ---

export async function getPharmacistQueue() {
    const { data } = await api.get('/pharmacist/queue');
    return data;
}

export async function reviewSession(sessionId) {
    const { data } = await api.patch(`/pharmacist/sessions/${sessionId}/review`);
    return data;
}

export async function getPharmacistStats() {
    const { data } = await api.get('/pharmacist/stats');
    return data;
}

// --- SUS Evaluation API ---

export async function submitSUSEvaluation(payload) {
    const { data } = await api.post('/sus/submit', payload);
    return data;
}

export async function getSUSResults() {
    const { data } = await api.get('/sus/results');
    return data;
}

export default api;
