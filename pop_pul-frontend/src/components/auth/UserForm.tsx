// src/pages/UserForm.tsx
import React, { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import './UserForm.css';

interface UserFormProps {
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onClose }) => {
  const { id, setId, password, setPassword, login, register, error } = useUser();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [name, setName] = useState<string>('');

  const handleSubmit = (type: 'login' | 'register') => {
    if (type === 'login') {
      login();
    } else {
      register({ id, password, name });
    }
    if (!error) {
      setName('');
      onClose(); // 성공 시 팝업 닫기
    }
  };

  return (
    <div className="user-form">
      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          로그인
        </button>
        <button
          className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          회원가입
        </button>
      </div>

      {activeTab === 'login' ? (
        <>
          <h3>로그인</h3>
          <div className="form-group">
            <label htmlFor="login-id">ID:</label>
            <input
              type="text"
              id="login-id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ID를 입력하세요"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">비밀번호:</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="input-field"
            />
          </div>
          <div className="button-group">
            <button onClick={() => handleSubmit('login')} className="button">
              로그인
            </button>
            <button onClick={onClose} className="button close-button">
              닫기
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>회원가입</h3>
          <div className="form-group">
            <label htmlFor="register-id">ID:</label>
            <input
              type="text"
              id="register-id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ID를 입력하세요"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-name">이름:</label>
            <input
              type="text"
              id="register-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-password">비밀번호:</label>
            <input
              type="password"
              id="register-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="input-field"
            />
          </div>
          <div className="button-group">
            <button onClick={() => handleSubmit('register')} className="button">
              회원가입
            </button>
            <button onClick={onClose} className="button close-button">
              닫기
            </button>
          </div>
        </>
      )}

      {error && (
        <div className="error-box">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default UserForm;