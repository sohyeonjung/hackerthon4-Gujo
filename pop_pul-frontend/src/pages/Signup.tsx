// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import "./Signup.css";

// const Signup: React.FC = () => {
//   const navigate = useNavigate();
//   const { signup } = useAuth();
//   const [nickname, setNickname] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await signup({ nickname, username, password });
//       navigate("/login");
//     } catch (err) {
//       setError("회원가입에 실패했습니다. 다른 아이디를 사용해보세요."+err);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         <div className="signup-header">
//           <h1>회원가입</h1>
//           <p>퀴즈를 만들고 참여해보세요!</p>
//         </div>

//         <form onSubmit={handleSubmit} className="signup-form">
//           <div className="input-wrapper">
//             <label htmlFor="nickname">닉네임</label>
//             <input
//               type="text"
//               id="nickname"
//               value={nickname}
//               onChange={(e) => setNickname(e.target.value)}
//               placeholder="닉네임을 입력하세요"
//               required
//             />
//           </div>

//           <div className="input-wrapper">
//             <label htmlFor="username">아이디</label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="아이디를 입력하세요"
//               required
//             />
//           </div>

//           <div className="input-wrapper">
//             <label htmlFor="password">비밀번호</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="비밀번호를 입력하세요"
//               required
//             />
//           </div>

//           {error && <div className="error-message">{error}</div>}

//           <button type="submit" className="signup-button">
//             회원가입
//           </button>

//           <div className="signup-footer">
//             <p>이미 계정이 있으신가요?</p>
//             <Link to="/login" className="login-link">
//               로그인
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;
