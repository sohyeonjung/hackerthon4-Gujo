import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { User } from "../types/auth";

// API URL을 환경 변수에서 가져오거나 기본값 사용
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export interface LoginResponse {
  user: User;
}

export interface SignupResponse {
  user: User;
}

export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", {
      username,
      password,
    });
    return response.data;
  },

  signup: async (
    username: string,
    password: string,
    nickname: string
  ): Promise<SignupResponse> => {
    const response = await api.post<SignupResponse>("/auth/signup", {
      username,
      password,
      nickname,
    });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>("/auth/me");
    return response.data;
  },
};
