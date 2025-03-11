export interface Problem {
  id: string;
  quizId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProblemDto {
  quizId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface UpdateProblemDto {
  question?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
}
