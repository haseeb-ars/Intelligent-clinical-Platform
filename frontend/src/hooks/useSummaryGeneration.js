import { useState, useCallback } from 'react';
import { generateSummary } from '../api/client';

/**
 * Custom hook for generating AI clinical summaries.
 * Manages loading state, error handling, summary data, and NLP results.
 */
export function useSummaryGeneration() {
    const [summary, setSummary] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    const [severityLevel, setSeverityLevel] = useState(null);
    const [extractedSymptoms, setExtractedSymptoms] = useState(null);
    const [redFlags, setRedFlags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const generate = useCallback(async (conditionId, conditionName, answers) => {
        setLoading(true);
        setError(null);
        setSummary(null);

        try {
            const data = await generateSummary(conditionId, conditionName, answers);
            setSummary(data.summary);
            setSessionId(data.sessionId);
            setSeverityLevel(data.severityLevel || null);
            setExtractedSymptoms(data.extractedSymptoms || null);
            setRedFlags(data.redFlags || []);
            return data;
        } catch (err) {
            const message = err.response?.data?.error || err.message || 'Failed to generate summary';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setSummary(null);
        setSessionId(null);
        setSeverityLevel(null);
        setExtractedSymptoms(null);
        setRedFlags([]);
        setError(null);
        setLoading(false);
    }, []);

    return {
        summary,
        sessionId,
        severityLevel,
        extractedSymptoms,
        redFlags,
        loading,
        error,
        generate,
        reset
    };
}

export default useSummaryGeneration;
