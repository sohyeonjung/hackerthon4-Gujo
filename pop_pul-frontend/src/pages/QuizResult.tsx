// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { quizService, QuizResult } from "../services/quiz";
// import "./QuizResult.css";

// const QuizResultPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const [result, setResult] = useState<QuizResult | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (id) {
//       loadResult(id);
//     }
//   }, [id]);

//   const loadResult = async (quizId: string) => {
//     try {
//       const data = await quizService.getQuizResult(quizId);
//       setResult(data);
//     } catch (err) {
//       setError("결과를 불러오는데 실패했습니다.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="loading">로딩 중...</div>;
//   }

//   if (!result) {
//     return (
//       <div className="quiz-result-container">
//         <div className="error-message">결과를 찾을 수 없습니다.</div>
//       </div>
//     );
//   }

//   return (
//     <div className="quiz-result-container">
//       <div className="result-header">
//         <h1>퀴즈 결과</h1>
//         <div className="score">
//           점수: {result.score}점 / {result.totalQuestions}점
//         </div>
//       </div>

//       <div className="result-content">
//         <div className="result-summary">
//           <div className="summary-item">
//             <span className="label">맞은 문제</span>
//             <span className="value correct">{result.correctAnswers}</span>
//           </div>
//           <div className="summary-item">
//             <span className="label">틀린 문제</span>
//             <span className="value incorrect">{result.wrongAnswers}</span>
//           </div>
//         </div>

//         <div className="questions-review">
//           <h2>문제 리뷰</h2>
//           {result.questions.map((question, index) => (
//             <div
//               key={index}
//               className={`question-review ${
//                 question.isCorrect ? "correct" : "incorrect"
//               }`}
//             >
//               <div className="question-header">
//                 <span className="question-number">문제 {index + 1}</span>
//                 <span className="question-status">
//                   {question.isCorrect ? "정답" : "오답"}
//                 </span>
//               </div>
//               <p className="question-content">{question.content}</p>
//               <div className="answer-info">
//                 <div className="your-answer">
//                   <span className="label">내 답:</span>
//                   <span className="value">{question.selectedAnswer}</span>
//                 </div>
//                 {!question.isCorrect && (
//                   <div className="correct-answer">
//                     <span className="label">정답:</span>
//                     <span className="value">{question.correctAnswer}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="result-actions">
//           <button
//             className="retry-button"
//             onClick={() => navigate(`/quizzes/${id}/play`)}
//           >
//             다시 시도
//           </button>
//           <button className="home-button" onClick={() => navigate("/quizzes")}>
//             홈으로
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizResultPage;
