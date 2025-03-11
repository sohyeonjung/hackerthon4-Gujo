// // src/pages/UserPage.tsx
// import React from 'react';
// import { useUser } from '../hooks/useUser';
// import './UserPage.css';

// const UserPage: React.FC = () => {
//   const {
//     id,
//     setId,
//     password,
//     setPassword,
//     response,
//     error,
//     isLoggedIn,
//     handleRegister,
//     handleLogin,
//     handleLogout,
//   } = useUser();

//   return (
//     <div className="user-container">
//       <h2>로그인 및 회원가입 테스트</h2>
//       {!isLoggedIn ? (
//         <>
//           <div className="form-group">
//             <label htmlFor="id">ID:</label>
//             <input
//               type="text"
//               id="id"
//               value={id}
//               onChange={(e) => setId(e.target.value)}
//               placeholder="ID를 입력하세요"
//               className="input-field"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">비밀번호:</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="비밀번호를 입력하세요"
//               className="input-field"
//             />
//           </div>
//           <div className="button-group">
//             <button onClick={handleRegister} className="button">
//               회원가입
//             </button>
//             <button onClick={handleLogin} className="button">
//               로그인
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="logged-in">
//           <p>로그인 상태입니다.</p>
//           <button onClick={handleLogout} className="button">
//             로그아웃
//           </button>
//         </div>
//       )}
//       {response && (
//         <div className="response-box">
//           <pre>{JSON.stringify(response, null, 2)}</pre>
//         </div>
//       )}
//       {error && (
//         <div className="error-box">
//           <p>{error}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserPage;