// // src/pages/QuizCreate.tsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import { quizService, CreateQuizData } from "../services/quiz";
// import "./QuizCreate.css";

// interface QuestionForm {
//   content: string;
//   options: string[];
//   correctAnswer: number;
// }

// const QuizCreate: React.FC = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [timeLimit, setTimeLimit] = useState(30);
//   const [questions, setQuestions] = useState<QuestionForm[]>([
//     { content: "", options: ["", "", "", ""], correctAnswer: 0 },
//   ]);
//   const [error, setError] = useState<string | null>(null);

//   if (!user) {
//     return (
//       <div className="quiz-create-container">
//         <div className="error-message">
//           퀴즈를 만들려면 로그인이 필요합니다.
//         </div>
//       </div>
//     );
//   }

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

//       await quizService.createQuiz(quizData);
//       navigate("/quizzes");
//     } catch (error) {
//       setError("퀴즈 생성에 실패했습니다. 다시 시도해주세요.");
//     }
//   };

//   return (
//     <div className="quiz-create-container">
//       <h1>새 퀴즈 만들기</h1>
//       <form onSubmit={handleSubmit} className="quiz-create-form">
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
//             퀴즈 만들기
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

// export default QuizCreate;
