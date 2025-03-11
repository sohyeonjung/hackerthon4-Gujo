import { Problem } from "./problem";

export interface Quiz {
  id: number;
  title: string;
  userId: string;
  problems?: Problem[];
}

export interface CreateQuizDto {
  title: string;
}

export interface UpdateQuizDto {
  title?: string;
}
