// src/pages/QuizList.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { quizService, Quiz } from "../services/quiz";

const QuizList: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pin, setPin] = useState("");

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const data = await quizService.fetchQuizzes();
      setQuizzes(data);
    } catch (err) {
      setError("퀴즈 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("정말로 이 퀴즈를 삭제하시겠습니까?")) {
      return;
    }

    try {
      await quizService.deleteQuiz(id);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    } catch (err) {
      setError("퀴즈 삭제에 실패했습니다.");
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) return;

    try {
      const quiz = await quizService.joinQuiz(pin);
      navigate(`/quizzes/${quiz.id}/play`);
    } catch (err) {
      setError("잘못된 PIN 번호입니다.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">퀴즈 목록</h1>
        {user && (
          <button
            onClick={() => navigate("/quizzes/create")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            새 퀴즈 만들기
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">PIN 번호로 참여하기</h2>
        <form onSubmit={handleJoin} className="flex gap-4">
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN 번호를 입력하세요"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            maxLength={4}
            pattern="[0-9]*"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            참여하기
          </button>
        </form>
      </div>

      <div className="grid gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
                <p className="text-gray-600 mb-4">{quiz.description}</p>
                <div className="text-sm text-gray-500">
                  문제 수: {quiz.questions.length}개 | 제한 시간:{" "}
                  {quiz.timeLimit}초
                </div>
              </div>
              <div className="flex gap-2">
                {user && (
                  <>
                    <button
                      onClick={() => navigate(`/quizzes/${quiz.id}/edit`)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(quiz.id)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      삭제
                    </button>
                  </>
                )}
                <button
                  onClick={() => navigate(`/quizzes/${quiz.id}/play`)}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  참여
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {quizzes.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          아직 생성된 퀴즈가 없습니다.
        </div>
      )}
    </div>
  );
};

export default QuizList;
