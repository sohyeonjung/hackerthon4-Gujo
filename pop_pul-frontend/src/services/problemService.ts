import axios from "axios";
import { Problem, CreateProblemDto } from "../types/problem";

const API_URL = "http://localhost:8080/api/quiz";

// axios 인스턴스 생성
const axiosInstance = axios.create({
  withCredentials: true, // 쿠키/세션을 요청과 함께 전송
});

export const problemService = {
  // 특정 퀴즈의 모든 문제 조회
  getProblems: async (quizId: number): Promise<Problem[]> => {
    try {
      const response = await axiosInstance.get(
        `${API_URL}/${quizId}/questions`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching problems:", error);
      throw error;
    }
  },

  // 특정 문제 조회
  getProblem: async (quizId: string, problemId: string): Promise<Problem> => {
    try {
      const response = await axiosInstance.get(
        `${API_URL}/${quizId}/questions/${problemId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching problem:", error);
      throw error;
    }
  },

  // 새로운 문제 생성
  createProblem: async (
    quizId: number,
    problem: CreateProblemDto
  ): Promise<Problem> => {
    try {
      const response = await axiosInstance.post(
        `${API_URL}/${quizId}/questions`,
        problem
      );
      return response.data;
    } catch (error) {
      console.error("Error creating problem:", error);
      throw error;
    }
  },

  // 문제 수정
  updateProblem: async (
    quizId: number,
    problemId: number,
    problem: Partial<Problem>
  ): Promise<Problem> => {
    try {
      const response = await axiosInstance.put(
        `${API_URL}/${quizId}/questions/${problemId}`,
        problem
      );
      return response.data;
    } catch (error) {
      console.error("Error updating problem:", error);
      throw error;
    }
  },

  // 문제 삭제
  deleteProblem: async (quizId: number, problemId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/${quizId}/questions/${problemId}`);
    } catch (error) {
      console.error("Error deleting problem:", error);
      throw error;
    }
  },
};
