// // src/pages/Login.tsx
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const { login } = useUser();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(username, password);
//       navigate("/");
//     } catch (err) {
//       setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요."+err);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <div className="login-header">
//           <h1>로그인1</h1>
//           <p>퀴즈를 만들고 참여해보세요!</p>
//         </div>

//         <form onSubmit={handleSubmit} className="login-form">
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

//           <button type="submit" className="login-button">
//             로그인
//           </button>

//           <div className="login-footer">
//             <p>계정이 없으신가요?</p>
//             <Link to="/signup" className="signup-link">
//               회원가입
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
