// src/pages/QuizPlay.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  quizService,
  Quiz,
  Question,
  Answer,
  QuizSubmission,
  QuizResult,
} from "../services/quiz";

const QuizPlay: React.FC = () => {
  const navigate = useNavigate();
  const { pin } = useParams<{ pin: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        if (!pin) {
          setError("PIN 번호가 필요합니다.");
          return;
        }
        const quizData = await quizService.fetchQuizByPin(pin);
        if (!quizData.isActive) {
          setError("이 퀴즈는 현재 비활성화되어 있습니다.");
          return;
        }
        setQuiz(quizData);
      } catch (err) {
        setError("퀴즈를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadQuiz();
  }, [pin]);

  useEffect(() => {
    if (!quiz || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, currentQuestionIndex, showResult]);

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [quiz?.questions[currentQuestionIndex].id || ""]: answerId,
    }));
  };

  const handleNextQuestion = () => {
    if (!quiz) return;

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    try {
      const submission: QuizSubmission = {
        quizId: quiz.id,
        answers: Object.entries(selectedAnswers).map(
          ([questionId, answerId]) => ({
            questionId,
            selectedAnswerId: answerId,
          })
        ),
      };

      const result = await quizService.submitQuiz(submission);
      setResult(result);
      setShowResult(true);
    } catch (err) {
      setError("퀴즈 제출에 실패했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">퀴즈를 찾을 수 없습니다.</div>
      </div>
    );
  }

  if (showResult && result) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">퀴즈 결과</h1>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">
              {result.score}점
            </div>
            <div className="text-gray-600">
              총 {result.totalQuestions}문제 중 {result.correctAnswers}문제 맞음
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {result.correctAnswers}
              </div>
              <div className="text-sm text-green-700">정답</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {result.wrongAnswers}
              </div>
              <div className="text-sm text-red-700">오답</div>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <div className="text-xl font-semibold text-indigo-600">
            {timeLeft}초
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">
            문제 {currentQuestionIndex + 1} / {quiz.questions.length}
          </div>
          <h2 className="text-xl font-medium mb-4">{currentQuestion.name}</h2>
          <div className="space-y-3">
            {currentQuestion.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleAnswerSelect(answer.id)}
                className={`w-full p-4 text-left rounded-lg border ${
                  selectedAnswers[currentQuestion.id] === answer.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
              >
                {answer.content}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleNextQuestion}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {currentQuestionIndex === quiz.questions.length - 1
              ? "제출하기"
              : "다음 문제"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPlay;
