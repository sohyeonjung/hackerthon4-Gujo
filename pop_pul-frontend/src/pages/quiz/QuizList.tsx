import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Quiz } from "../../types/quiz";
import { quizService } from "../../services/quizService";

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const data = await quizService.getQuizzes();
      setQuizzes(data);
      setError(null);
    } catch (err) {
      setError("퀴즈 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("정말로 이 퀴즈를 삭제하시겠습니까?")) {
      try {
        await quizService.deleteQuiz(id);
        setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
      } catch (err) {
        setError("퀴즈 삭제에 실패했습니다.");
      }
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">퀴즈 목록</h1>
        <button
          onClick={() => navigate("/quiz/create")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          새 퀴즈 만들기
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => navigate(`/quiz/${quiz.id}`)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
              >
                상세보기
              </button>
              <button
                onClick={() => navigate(`/quiz/${quiz.id}/edit`)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(quiz.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {quizzes.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          아직 생성된 퀴즈가 없습니다.
        </div>
      )}
    </div>
  );
};

export default QuizList;
