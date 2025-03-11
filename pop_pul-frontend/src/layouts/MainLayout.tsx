import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./MainLayout.css"; // Import the CSS file

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();

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
              <Link to="/" className="nav-link">
                홈
              </Link>
              {user && (
                <Link to="/quizzes" className="nav-link">
                  퀴즈 목록
                </Link>
              )}
            </div>
          </div>
          <div className="nav-auth">
            {user ? (
              <div className="nav-user-auth">
                <span className="nav-user-name">{user.name}</span>
                <button onClick={logout} className="nav-logout-button">
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="nav-guest-auth">
                <Link to="/login" className="nav-login-link">
                  로그인
                </Link>
                <Link to="/signup" className="nav-signup-button">
                  회원가입
                </Link>
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
    </div>
  );
};

export default MainLayout;