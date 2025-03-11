import axios from "axios";
import { Quiz, CreateQuizDto, UpdateQuizDto } from "../types/quiz";

const API_URL = "http://localhost:8080/api/quiz";

// axios 인스턴스 생성
const axiosInstance = axios.create({
  withCredentials: true, // 쿠키/세션을 요청과 함께 전송
});

export const quizService = {
  // 퀴즈 목록 조회
  getQuizzes: async (): Promise<Quiz[]> => {
    const response = await axiosInstance.get(`${API_URL}`);
    return response.data;
  },

  // 특정 퀴즈 조회
  getQuiz: async (id: string): Promise<Quiz> => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
  },

  // 퀴즈 생성
  createQuiz: async (quizData: CreateQuizDto): Promise<Quiz> => {
    const response = await axiosInstance.post(`${API_URL}`, quizData);
    return response.data;
  },

  // 퀴즈 수정
  updateQuiz: async (id: string, quizData: UpdateQuizDto): Promise<Quiz> => {
    const response = await axiosInstance.put(`${API_URL}/${id}`, quizData);
    return response.data;
  },

  // 퀴즈 삭제
  deleteQuiz: async (id: string): Promise<void> => {
    await axiosInstance.delete(`${API_URL}/${id}`);
  },
};
