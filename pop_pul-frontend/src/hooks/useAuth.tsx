import React, { useState, useEffect, createContext, useContext } from "react";
import {
  login as loginService,
  signup as signupService,
  logout as logoutService,
  getCurrentUser,
} from "../services/auth";
import { User, AuthContextType } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setError(null);
      const userData = await loginService(username, password);
      setUser(userData);
    } catch (err) {
      setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
      throw err;
    }
  };

  const signup = async (data: {
    nickname: string;
    username: string;
    password: string;
  }) => {
    try {
      setError(null);
      const userData = await signupService(
        data.username,
        data.password,
        data.nickname
      );
      setUser(userData);
    } catch (err) {
      setError("회원가입에 실패했습니다. 다른 아이디를 사용해보세요.");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      setUser(null);
    } catch (err) {
      setError("로그아웃에 실패했습니다.");
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
