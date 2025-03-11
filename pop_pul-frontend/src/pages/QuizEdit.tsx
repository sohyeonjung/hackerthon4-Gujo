// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import { quizService, CreateQuizData } from "../services/quiz";
// import "./QuizEdit.css";

// interface QuestionForm {
//   content: string;
//   options: string[];
//   correctAnswer: number;
// }

// const QuizEdit: React.FC = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const { user } = useAuth();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [timeLimit, setTimeLimit] = useState(30);
//   const [questions, setQuestions] = useState<QuestionForm[]>([
//     { content: "", options: ["", "", "", ""], correctAnswer: 0 },
//   ]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (id) {
//       loadQuiz(id);
//     }
//   }, [id]);

//   const loadQuiz = async (quizId: string) => {
//     try {
//       const quiz = await quizService.getQuiz(quizId);
//       setTitle(quiz.title);
//       setDescription(quiz.description);
//       setTimeLimit(quiz.timeLimit);
//       setQuestions(
//         quiz.questions.map((q) => ({
//           content: q.content,
//           options: q.options,
//           correctAnswer: q.correctAnswer,
//         }))
//       );
//     } catch (err) {
//       setError("퀴즈를 불러오는데 실패했습니다.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addQuestion = () => {
//     setQuestions([
//       ...questions,
//       { content: "", options: ["", "", "", ""], correctAnswer: 0 },
//     ]);
//   };

//   const removeQuestion = (index: number) => {
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   const handleQuestionChange = (
//     index: number,
//     field: keyof QuestionForm,
//     value: any
//   ) => {
//     const newQuestions = [...questions];
//     newQuestions[index] = {
//       ...newQuestions[index],
//       [field]: value,
//     };
//     setQuestions(newQuestions);
//   };

//   const handleOptionChange = (
//     questionIndex: number,
//     optionIndex: number,
//     value: string
//   ) => {
//     const newQuestions = [...questions];
//     newQuestions[questionIndex].options[optionIndex] = value;
//     setQuestions(newQuestions);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!id) return;

//     try {
//       const quizData: CreateQuizData = {
//         title,
//         description,
//         timeLimit,
//         questions: questions.map((q, index) => ({
//           content: q.content,
//           options: q.options,
//           correctAnswer: q.correctAnswer,
//           order: index,
//         })),
//       };

//       await quizService.updateQuiz(id, quizData);
//       navigate("/quizzes");
//     } catch (err) {
//       setError("퀴즈 수정에 실패했습니다.");
//     }
//   };

//   if (loading) {
//     return <div className="loading">로딩 중...</div>;
//   }

//   if (!user) {
//     return (
//       <div className="quiz-edit-container">
//         <div className="error-message">
//           퀴즈를 수정하려면 로그인이 필요합니다.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="quiz-edit-container">
//       <h1>퀴즈 수정</h1>
//       <form onSubmit={handleSubmit} className="quiz-edit-form">
//         <div className="form-group">
//           <label htmlFor="title">퀴즈 제목</label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">퀴즈 설명</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="timeLimit">제한 시간 (초)</label>
//           <input
//             type="number"
//             id="timeLimit"
//             value={timeLimit}
//             onChange={(e) => setTimeLimit(Number(e.target.value))}
//             min="1"
//             required
//           />
//         </div>

//         <div className="questions-section">
//           <h2>문제 목록</h2>
//           {questions.map((question, questionIndex) => (
//             <div key={questionIndex} className="question-card">
//               <div className="question-header">
//                 <h3>문제 {questionIndex + 1}</h3>
//                 {questions.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeQuestion(questionIndex)}
//                     className="remove-button"
//                   >
//                     삭제
//                   </button>
//                 )}
//               </div>

//               <div className="form-group">
//                 <label>문제 내용</label>
//                 <input
//                   type="text"
//                   value={question.content}
//                   onChange={(e) =>
//                     handleQuestionChange(
//                       questionIndex,
//                       "content",
//                       e.target.value
//                     )
//                   }
//                   required
//                 />
//               </div>

//               <div className="options-section">
//                 <label>보기</label>
//                 {question.options.map((option, optionIndex) => (
//                   <div key={optionIndex} className="option-group">
//                     <input
//                       type="radio"
//                       name={`correct-${questionIndex}`}
//                       checked={question.correctAnswer === optionIndex}
//                       onChange={() =>
//                         handleQuestionChange(
//                           questionIndex,
//                           "correctAnswer",
//                           optionIndex
//                         )
//                       }
//                     />
//                     <input
//                       type="text"
//                       value={option}
//                       onChange={(e) =>
//                         handleOptionChange(
//                           questionIndex,
//                           optionIndex,
//                           e.target.value
//                         )
//                       }
//                       placeholder={`보기 ${optionIndex + 1}`}
//                       required
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addQuestion}
//             className="add-question-button"
//           >
//             문제 추가
//           </button>
//         </div>

//         {error && <div className="error-message">{error}</div>}

//         <div className="form-actions">
//           <button type="submit" className="submit-button">
//             수정 완료
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate("/quizzes")}
//             className="cancel-button"
//           >
//             취소
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default QuizEdit;
