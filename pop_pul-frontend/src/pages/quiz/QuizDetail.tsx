import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Quiz } from "../../types/quiz";
import { quizService } from "../../services/quizService";

const QuizDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadQuiz();
  }, [id]);

  const loadQuiz = async () => {
    if (!id) return;
    try {
      const data = await quizService.getQuiz(id);
      setQuiz(data);
      setError(null);
    } catch (err) {
      setError("퀴즈 정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm("정말로 이 퀴즈를 삭제하시겠습니까?")) return;

    try {
      await quizService.deleteQuiz(id);
      navigate("/quiz");
    } catch (err) {
      setError("퀴즈 삭제에 실패했습니다.");
    }
  };

  if (isLoading) return <div className="text-center p-4">로딩 중...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!quiz)
    return <div className="text-center p-4">퀴즈를 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold">{quiz.title}</h1>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/quiz/${id}/problems`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  문제 관리
                </button>
                <button
                  onClick={() => navigate(`/quiz/${id}/edit`)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  삭제
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">퀴즈 설명</h2>
              <p className="text-gray-600 whitespace-pre-line">
                {quiz.description}
              </p>
            </div>

            <div className="border-t pt-4">
              <div className="text-sm text-gray-500">
                <p>생성일: {new Date(quiz.createdAt).toLocaleDateString()}</p>
                <p>
                  최종 수정일: {new Date(quiz.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => navigate("/quiz")}
            className="text-gray-600 hover:text-gray-800"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
