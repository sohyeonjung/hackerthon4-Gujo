// // src/pages/QuizList.tsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import { quizService, Quiz } from "../services/quiz";
// import "./QuizList.css";

// const QuizList: React.FC = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [pin, setPin] = useState("");

//   useEffect(() => {
//     loadQuizzes();
//   }, []);

//   const loadQuizzes = async () => {
//     try {
//       const data = await quizService.getQuizzes();
//       setQuizzes(data);
//     } catch (err) {
//       setError("퀴즈 목록을 불러오는데 실패했습니다.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm("정말로 이 퀴즈를 삭제하시겠습니까?")) {
//       return;
//     }

//     try {
//       await quizService.deleteQuiz(id);
//       setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
//     } catch (err) {
//       setError("퀴즈 삭제에 실패했습니다.");
//     }
//   };

//   const handleJoin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!pin) {
//       setError("PIN을 입력해주세요.");
//       return;
//     }

//     try {
//       const quiz = await quizService.joinQuiz(pin);
//       navigate(`/quizzes/${quiz.id}/play`);
//     } catch (err) {
//       setError("잘못된 PIN입니다.");
//     }
//   };

//   if (loading) {
//     return <div className="loading">로딩 중...</div>;
//   }

//   return (
//     <div className="quiz-list-container">
//       <h1>퀴즈 목록</h1>

//       <form onSubmit={handleJoin} className="pin-form">
//         <div className="form-group">
//           <label htmlFor="pin">PIN으로 퀴즈 참여하기</label>
//           <div className="pin-input-group">
//             <input
//               type="text"
//               id="pin"
//               value={pin}
//               onChange={(e) => setPin(e.target.value)}
//               placeholder="PIN 입력"
//               required
//             />
//             <button type="submit" className="join-button">
//               참여하기
//             </button>
//           </div>
//         </div>
//       </form>

//       {error && <div className="error-message">{error}</div>}

//       {user && (
//         <div className="create-quiz-section">
//           <button
//             onClick={() => navigate("/quizzes/create")}
//             className="create-quiz-button"
//           >
//             새 퀴즈 만들기
//           </button>
//         </div>
//       )}

//       <div className="quiz-grid">
//         {quizzes.map((quiz) => (
//           <div key={quiz.id} className="quiz-card">
//             <div className="quiz-card-header">
//               <h2>{quiz.title}</h2>
//               {user && (
//                 <div className="quiz-actions">
//                   <button
//                     onClick={() => navigate(`/quizzes/${quiz.id}/edit`)}
//                     className="edit-button"
//                   >
//                     수정
//                   </button>
//                   <button
//                     onClick={() => handleDelete(quiz.id)}
//                     className="delete-button"
//                   >
//                     삭제
//                   </button>
//                 </div>
//               )}
//             </div>
//             <p className="quiz-description">{quiz.description}</p>
//             <div className="quiz-info">
//               <span>제한 시간: {quiz.timeLimit}초</span>
//               <span>문제 수: {quiz.questions.length}개</span>
//             </div>
//             <div className="quiz-pin">
//               <span>PIN: {quiz.pin}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuizList;
