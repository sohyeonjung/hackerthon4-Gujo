// src/types/user.ts
export interface UserRequest {
  id: string;
  password: string;
  name?: string; // 회원가입 시 필요
}

export interface UserResponse {
  success: boolean;
  message: string;
  id?: string;
  name?: string;
}