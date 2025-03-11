// src/hooks/useUser.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { checkAuthStatus, loginUser, logoutUser, registerUser } from '../services/userService';
import { UserResponse } from '../types/user';

interface AuthContextType {
  id: string;
  setId: (id: string) => void;
  password: string;
  setPassword: (password: string) => void;
  user: UserResponse | null;
  error: string | null;
  isLoading: boolean;
  register: (data: { id: string; password: string; name: string }) => void;
  login: () => void;
  logout: () => void;
  showLoginPopup: boolean;
  setShowLoginPopup: (show: boolean) => void;
  message: string | null; // 서버 메시지 상태 추가
  setMessage: (msg: string | null) => void; // 메시지 설정 함수
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<UserResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null); // 메시지 상태

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await checkAuthStatus();
        if (response.success) {
          setUser(response);
        }
      } catch (err) {
        console.log('인증 상태 확인 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const handleRequest = async (
    requestFn: () => Promise<UserResponse>,
    successCallback?: () => void
  ) => {
    setError(null);
    setMessage(null); // 요청 시작 시 메시지 초기화
    try {
      const response = await requestFn();
      setMessage(response.message); // 서버 메시지 설정
      if (response.success) {
        setUser(response);
        if (successCallback) successCallback();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('요청 중 오류가 발생했습니다.'+err);
      setMessage('서버와의 연결에 문제가 발생했습니다.');
    }
  };

  const register = (data: { id: string; password: string; name: string }) => {
    if (!data.id || !data.password || !data.name) {
      setError('모든 필드를 입력하세요.');
      setMessage('모든 필드를 입력하세요.');
      return;
    }
    handleRequest(() => registerUser(data));
  };

  const login = () => {
    if (!id || !password) {
      setError('ID와 비밀번호를 입력하세요.');
      setMessage('ID와 비밀번호를 입력하세요.');
      return;
    }
    handleRequest(() => loginUser({ id, password }), () => {
      setId('');
      setPassword('');
      setShowLoginPopup(false);
    });
  };

  const logout = () => {
    handleRequest(() => logoutUser(), () => {
      setUser(null);
      setId('');
      setPassword('');
    });
  };

  const value = {
    id,
    setId,
    password,
    setPassword,
    user,
    error,
    isLoading,
    register,
    login,
    logout,
    showLoginPopup,
    setShowLoginPopup,
    message,
    setMessage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be used within an AuthProvider');
  }
  return context;
};