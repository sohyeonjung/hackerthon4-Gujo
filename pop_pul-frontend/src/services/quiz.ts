import { api } from "./api";

export interface Question {
  id: string;
  content: string;
  options: string[];
  correctAnswer: number;
  order: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  userId: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateQuizData {
  title: string;
  description: string;
  timeLimit: number;
  questions: {
    content: string;
    options: string[];
    correctAnswer: number;
    order: number;
  }[];
}

export interface QuizSubmission {
  quizId: string;
  answers: {
    questionId: string;
    selectedAnswerId: string;
  }[];
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
}

export const quizService = {
  fetchQuizzes: async (): Promise<Quiz[]> => {
    const response = await api.get<Quiz[]>("/quizzes");
    return response.data;
  },

  fetchQuiz: async (id: string): Promise<Quiz> => {
    const response = await api.get<Quiz>(`/quizzes/${id}`);
    return response.data;
  },

  createQuiz: async (data: CreateQuizData): Promise<Quiz> => {
    const response = await api.post<Quiz>("/quizzes", data);
    return response.data;
  },

  updateQuiz: async (
    id: string,
    data: Partial<CreateQuizData>
  ): Promise<Quiz> => {
    const response = await api.put<Quiz>(`/quizzes/${id}`, data);
    return response.data;
  },

  deleteQuiz: async (id: string): Promise<void> => {
    await api.delete(`/quizzes/${id}`);
  },

  joinQuiz: async (pin: string): Promise<Quiz> => {
    const response = await api.post<Quiz>("/quizzes/join", { pin });
    return response.data;
  },

  submitQuiz: async (
    quizId: string,
    answers: Record<string, number>
  ): Promise<void> => {
    await api.post(`/quizzes/${quizId}/submit`, { answers });
  },

  fetchQuizByPin: async (pin: string): Promise<Quiz> => {
    const response = await api.get<Quiz>(`/quizzes/pin/${pin}`);
    return response.data;
  },

  fetchMyQuizzes: async (): Promise<Quiz[]> => {
    const response = await api.get<Quiz[]>("/quizzes/my");
    return response.data;
  },

  toggleQuizActive: async (id: string): Promise<Quiz> => {
    const response = await api.put<Quiz>(`/quizzes/${id}/toggle-active`);
    return response.data;
  },
};
