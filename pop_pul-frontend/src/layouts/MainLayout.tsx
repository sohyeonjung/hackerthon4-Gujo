// src/components/MainLayout.tsx
import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserForm from '../components/auth/UserForm';
import { useUser } from '../hooks/useUser';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  const { user, logout, showLoginPopup, setShowLoginPopup, message, setMessage } = useUser();

  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };

  // 메시지가 있을 때 3초 후 사라지게 설정
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000); // 3초 후 메시지 제거
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [message, setMessage]);

  return (
    <div className="main-layout">
      <nav className="main-nav">
        <div className="nav-container">
          <div className="nav-flex">
            <div className="nav-logo-container">
              <Link to="/" className="nav-logo">
                PopPul
              </Link>
            </div>
            <div className="nav-links">
              {user && (
                <Link to="/quiz" className="nav-link nav-text">
                  퀴즈 목록
                </Link>
              )}
            </div>
          </div>
          <div className="nav-auth">
            {user ? (
              <div className="nav-user-auth">
                <span className="nav-user-name nav-text">{user.name}</span>
                <button onClick={logout} className="nav-button">
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="nav-guest-auth">
                <button onClick={() => setShowLoginPopup(true)} className="nav-button">
                  로그인
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="content-container">
          <Outlet />
        </div>
      </main>

      {showLoginPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <UserForm onClose={handleClosePopup} />
          </div>
        </div>
      )}

      {message && (
        <div className="toast-message">
          {message}
        </div>
      )}
    </div>
  );
};

export default MainLayout;