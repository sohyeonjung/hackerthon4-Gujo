import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { quizService } from "../services/quiz";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) return;

    try {
      setError(null);
      const quiz = await quizService.joinQuiz(pin);
      navigate(`/quizzes/${quiz.id}/play`);
    } catch (error) {
      setError("잘못된 PIN 번호입니다. 다시 확인해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">즐거운 퀴즈</span>
              <span className="block text-indigo-600">함께 풀어보세요</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              PIN 번호만으로 퀴즈에 참여할 수 있습니다. 친구들과 함께 재미있게
              문제를 풀어보세요.
            </p>
            {user && (
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => navigate("/quizzes/create")}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    퀴즈 만들기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PIN 입력 섹션 */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            PIN 번호로 참여하기
          </h2>
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleJoin} className="flex gap-4">
            <input
              type="text"
              value={pin}
              onChange={(e) =>
                setPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))
              }
              placeholder="PIN 번호를 입력하세요"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              maxLength={4}
              pattern="[0-9]*"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              참여하기
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500">
            * PIN 번호는 퀴즈 생성자에게 문의하세요.
          </p>
        </div>
      </div>

      {/* 안내 섹션 */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-indigo-600 text-2xl mb-4">1</div>
            <h3 className="text-lg font-semibold mb-2">PIN 번호 받기</h3>
            <p className="text-gray-600">
              퀴즈 생성자로부터 PIN 번호를 받으세요.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-indigo-600 text-2xl mb-4">2</div>
            <h3 className="text-lg font-semibold mb-2">PIN 번호 입력</h3>
            <p className="text-gray-600">
              받은 PIN 번호를 입력하고 참여하기를 클릭하세요.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-indigo-600 text-2xl mb-4">3</div>
            <h3 className="text-lg font-semibold mb-2">퀴즈 풀기</h3>
            <p className="text-gray-600">
              제한 시간 내에 문제를 풀고 결과를 확인하세요.
            </p>
          </div>
        </div>
      </div>

      {/* CTA 섹션 */}
      {!user && (
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">퀴즈를 만들어보세요</span>
              <span className="block text-indigo-600">
                나만의 퀴즈를 만들고 친구들과 공유하세요
              </span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <button
                  onClick={() => navigate("/signup")}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  시작하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
