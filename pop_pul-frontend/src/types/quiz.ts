export interface Quiz {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

export interface CreateQuizDto {
  title: string;
  description: string;
}

export interface UpdateQuizDto {
  title?: string;
  description?: string;
}
