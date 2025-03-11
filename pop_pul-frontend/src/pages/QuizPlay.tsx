// // src/pages/QuizPlay.tsx
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { quizService, Quiz } from "../services/quiz";
// import "./QuizPlay.css";

// const QuizPlay: React.FC = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState<number[]>([]);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (id) {
//       loadQuiz(id);
//     }
//   }, [id]);

//   useEffect(() => {
//     if (quiz && timeLeft > 0) {
//       const timer = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(timer);
//             handleSubmit();
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);

//       return () => clearInterval(timer);
//     }
//   }, [quiz, timeLeft]);

//   const loadQuiz = async (quizId: string) => {
//     try {
//       const data = await quizService.getQuiz(quizId);
//       setQuiz(data);
//       setTimeLeft(data.timeLimit);
//       setAnswers(new Array(data.questions.length).fill(-1));
//     } catch (err) {
//       setError("퀴즈를 불러오는데 실패했습니다.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnswerSelect = (answerIndex: number) => {
//     setAnswers((prev) => {
//       const newAnswers = [...prev];
//       newAnswers[currentQuestionIndex] = answerIndex;
//       return newAnswers;
//     });
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
//       setCurrentQuestionIndex((prev) => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prev) => prev - 1);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!quiz || !id) return;

//     try {
//       await quizService.submitQuiz(id, answers);
//       navigate(`/quizzes/${id}/result`);
//     } catch (err) {
//       setError("답안 제출에 실패했습니다.");
//     }
//   };

//   if (loading) {
//     return <div className="loading">로딩 중...</div>;
//   }

//   if (!quiz) {
//     return (
//       <div className="quiz-play-container">
//         <div className="error-message">퀴즈를 찾을 수 없습니다.</div>
//       </div>
//     );
//   }

//   const currentQuestion = quiz.questions[currentQuestionIndex];

//   return (
//     <div className="quiz-play-container">
//       <div className="quiz-header">
//         <h1>{quiz.title}</h1>
//         <div className="timer">
//           남은 시간: {Math.floor(timeLeft / 60)}:
//           {(timeLeft % 60).toString().padStart(2, "0")}
//         </div>
//       </div>

//       {error && <div className="error-message">{error}</div>}

//       <div className="quiz-content">
//         <div className="question-section">
//           <div className="question-number">
//             문제 {currentQuestionIndex + 1} / {quiz.questions.length}
//           </div>
//           <h2 className="question-content">{currentQuestion.content}</h2>
//         </div>

//         <div className="options-section">
//           {currentQuestion.options.map((option, index) => (
//             <button
//               key={index}
//               className={`option-button ${
//                 answers[currentQuestionIndex] === index ? "selected" : ""
//               }`}
//               onClick={() => handleAnswerSelect(index)}
//             >
//               {option}
//             </button>
//           ))}
//         </div>

//         <div className="navigation-buttons">
//           <button
//             className="nav-button previous"
//             onClick={handlePrevious}
//             disabled={currentQuestionIndex === 0}
//           >
//             이전
//           </button>
//           {currentQuestionIndex === quiz.questions.length - 1 ? (
//             <button
//               className="nav-button submit"
//               onClick={handleSubmit}
//               disabled={answers.some((answer) => answer === -1)}
//             >
//               제출
//             </button>
//           ) : (
//             <button
//               className="nav-button next"
//               onClick={handleNext}
//               disabled={answers[currentQuestionIndex] === -1}
//             >
//               다음
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizPlay;
