import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Quiz } from "../../types/quiz";
import { Problem } from "../../types/problem";
import { quizService } from "../../services/quizService";
import { problemService } from "../../services/problemService";

const QuizDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadQuizAndProblems();
  }, [id]);

  const loadQuizAndProblems = async () => {
    if (!id) return;
    try {
      const [quizData, problemsData] = await Promise.all([
        quizService.getQuiz(id),
        problemService.getProblems(Number(id)),
      ]);
      setQuiz(quizData);
      setProblems(problemsData);
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
                  onClick={() => navigate(`/quiz/${id}/problems/create`)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  문제 추가
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

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">문제 목록</h2>
              {problems.length === 0 ? (
                <p className="text-gray-500">아직 등록된 문제가 없습니다.</p>
              ) : (
                <div className="space-y-4">
                  {problems.map((problem, index) => (
                    <div
                      key={problem.id}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium">
                            {index + 1}. {problem.title}
                          </h3>
                          {problem.image && (
                            <img
                              src={problem.image}
                              alt="문제 이미지"
                              className="mt-2 max-w-md rounded"
                            />
                          )}
                          <div className="mt-2 space-y-1">
                            {problem.answerList.map((answer, answerIndex) => (
                              <p
                                key={answer.id}
                                className={`${
                                  answer.isCorrect
                                    ? "text-green-600 font-medium"
                                    : "text-gray-600"
                                }`}
                              >
                                {answerIndex + 1}. {answer.content}
                                {answer.isCorrect && " (정답)"}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              navigate(
                                `/quiz/${id}/problems/${problem.id}/edit`
                              )
                            }
                            className="text-blue-500 hover:text-blue-600"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "정말로 이 문제를 삭제하시겠습니까?"
                                )
                              ) {
                                problemService.deleteProblem(
                                  Number(id),
                                  problem.id
                                );
                                loadQuizAndProblems();
                              }
                            }}
                            className="text-red-500 hover:text-red-600"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
