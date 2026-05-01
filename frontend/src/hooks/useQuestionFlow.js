import { useState, useCallback, useMemo } from 'react';
import { conditions } from '../data/conditions';

/**
 * Custom hook for managing the branching question flow.
 * Tracks current question index, collected answers, and navigation.
 */
export function useQuestionFlow(conditionId) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    const condition = useMemo(
        () => conditions.find(c => c.id === conditionId),
        [conditionId]
    );

    const questions = condition?.questions || [];
    const totalQuestions = questions.length;
    const currentQuestion = questions[currentIndex] || null;
    const isComplete = currentIndex >= totalQuestions;
    const progress = totalQuestions > 0 ? ((currentIndex) / totalQuestions) * 100 : 0;

    const answerQuestion = useCallback((questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    }, []);

    const nextQuestion = useCallback(() => {
        if (currentIndex < totalQuestions) {
            setCurrentIndex(prev => prev + 1);
        }
    }, [currentIndex, totalQuestions]);

    const previousQuestion = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    }, [currentIndex]);

    const reset = useCallback(() => {
        setCurrentIndex(0);
        setAnswers({});
    }, []);

    // Format answers for API submission
    const getFormattedAnswers = useCallback(() => {
        return questions.map(q => ({
            questionId: q.id,
            question: q.text,
            answer: answers[q.id] || 'Not answered',
            type: q.type
        }));
    }, [questions, answers]);

    return {
        condition,
        currentQuestion,
        currentIndex,
        totalQuestions,
        progress,
        isComplete,
        answers,
        answerQuestion,
        nextQuestion,
        previousQuestion,
        reset,
        getFormattedAnswers
    };
}

export default useQuestionFlow;
