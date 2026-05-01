import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import { useQuestionFlow } from '../hooks/useQuestionFlow';

export default function QuestionnairePage() {
    const { conditionId } = useParams();
    const navigate = useNavigate();

    const {
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
        getFormattedAnswers
    } = useQuestionFlow(conditionId);

    const handleNext = useCallback(() => {
        if (isComplete || currentIndex === totalQuestions - 1) {
            // Navigate to summary with answers
            const formattedAnswers = getFormattedAnswers();
            navigate(`/summary/${conditionId}`, {
                state: {
                    conditionId,
                    conditionName: condition?.name,
                    answers: formattedAnswers
                }
            });
        } else {
            nextQuestion();
        }
    }, [isComplete, currentIndex, totalQuestions, getFormattedAnswers, navigate, conditionId, condition, nextQuestion]);

    if (!condition) {
        return (
            <div className="page-container">
                <div className="error-state">
                    <h2>Condition not found</h2>
                    <p>The selected condition could not be found.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
    const hasAnswer = currentAnswer !== undefined && currentAnswer !== null &&
        (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : true);

    return (
        <div className="questionnaire-page">
            <div className="questionnaire-header">
                <button className="btn-back" onClick={() => currentIndex === 0 ? navigate('/') : previousQuestion()}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M13 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {currentIndex === 0 ? 'Back to conditions' : 'Previous question'}
                </button>
                <div className="questionnaire-condition-badge" style={{ '--condition-color': condition.color }}>
                    <span>{condition.icon}</span>
                    <span>{condition.name}</span>
                </div>
            </div>

            <ProgressBar
                progress={progress}
                currentStep={currentIndex + 1}
                totalSteps={totalQuestions}
            />

            {currentQuestion && (
                <QuestionCard
                    key={currentQuestion.id}
                    question={currentQuestion}
                    currentAnswer={currentAnswer}
                    onAnswer={answerQuestion}
                    animationKey={currentIndex}
                />
            )}

            <div className="questionnaire-actions">
                <button
                    className="btn btn-primary btn-lg"
                    onClick={handleNext}
                    disabled={!hasAnswer}
                >
                    {currentIndex === totalQuestions - 1 ? (
                        <>
                            Generate Summary
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M3 9h9m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </>
                    ) : (
                        <>
                            Next Question
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
