export interface Quiz {
  id: number;
  title: string;
  userId: string;
}

export interface CreateQuizDto {
  title: string;
}

export interface UpdateQuizDto {
  title?: string;
}
