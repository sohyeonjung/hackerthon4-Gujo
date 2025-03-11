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
    } catch (error) {
      console.error("Error loading quiz and problems:", error);
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
    } catch (error) {
      console.error("Error deleting quiz:", error);
      setError("퀴즈 삭제에 실패했습니다.");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p className="font-bold">오류</p>
          <p>{error}</p>
        </div>
      </div>
    );

  if (!quiz)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400 mb-4 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01"
            />
          </svg>
          <p className="text-xl text-gray-600">퀴즈를 찾을 수 없습니다.</p>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {quiz.title}
                </h1>
                <p className="text-gray-600 mt-2">
                  총 {problems.length}개의 문제
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => navigate(`/quiz/${id}/problems/create`)}
                  className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  문제 추가
                </button>
                <button
                  onClick={() => navigate(`/quiz/${id}/edit`)}
                  className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  삭제
                </button>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  문제 목록
                </h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {problems.length}문제
                </span>
              </div>

              {problems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <p className="text-xl text-gray-600 mb-4">
                    아직 등록된 문제가 없습니다.
                  </p>
                  <button
                    onClick={() => navigate(`/quiz/${id}/problems/create`)}
                    className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    첫 문제 추가하기
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {problems.map((problem, index) => (
                    <div
                      key={problem.id}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                              문제 {index + 1}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {problem.title}
                            </h3>
                          </div>
                          {problem.image && (
                            <img
                              src={problem.image}
                              alt="문제 이미지"
                              className="mt-2 max-w-md rounded-lg shadow-sm"
                            />
                          )}
                          <div className="mt-4 space-y-2">
                            {problem.answerList.map((answer, answerIndex) => (
                              <div
                                key={answer.id}
                                className={`flex items-center p-3 rounded-lg ${
                                  answer.isCorrect
                                    ? "bg-green-50 border-2 border-green-200"
                                    : "bg-white border border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <div className="flex items-center flex-1 gap-3">
                                  <div
                                    className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium ${
                                      answer.isCorrect
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {answerIndex + 1}
                                  </div>
                                  <p
                                    className={`${
                                      answer.isCorrect
                                        ? "text-green-700 font-medium"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {answer.content}
                                  </p>
                                </div>
                                {answer.isCorrect && (
                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-green-100 text-green-800">
                                    <svg
                                      className="w-4 h-4 mr-1"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    정답
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() =>
                              navigate(
                                `/quiz/${id}/problems/${problem.id}/edit`
                              )
                            }
                            className="inline-flex items-center px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            수정
                          </button>
                          <button
                            onClick={async () => {
                              if (
                                window.confirm(
                                  "정말로 이 문제를 삭제하시겠습니까?"
                                )
                              ) {
                                try {
                                  await problemService.deleteProblem(
                                    Number(id),
                                    problem.id
                                  );
                                  await loadQuizAndProblems();
                                } catch (error) {
                                  console.error(
                                    "Error deleting problem:",
                                    error
                                  );
                                  setError("문제 삭제에 실패했습니다.");
                                }
                              }
                            }}
                            className="inline-flex items-center px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
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

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => navigate("/quiz")}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
