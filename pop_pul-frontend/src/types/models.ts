// src/types/models.ts

export interface User {
  id: string;
  name: string | null;
  password: string | null; // Note: Password should not be exposed in frontend
}

export interface Quiz {
  id: number;
  title: string | null;
  userId: string;
  questions?: Question[]; // Relation
}

export interface Question {
  id: number;
  name: string | null;
  image: string | null;
  quizId: number;
  answers?: Answer[]; // Relation
}

export interface Answer {
  id: number;
  questionId: number;
  no: number | null;
  content: string | null;
  isAnswer: boolean | null;
}

// Additional types for frontend use
export interface QuizSubmission {
  quizId: number;
  answers: {
    questionId: number;
    selectedAnswerId: number;
  }[];
}

export interface QuizResult {
  quizId: number;
  totalQuestions: number;
  correctAnswers: number;
  score: number; // Percentage
  questionResults: {
    questionId: number;
    correct: boolean;
    correctAnswerId: number;
    selectedAnswerId: number;
  }[];
}
