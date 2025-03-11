// src/service/userService.ts
import axios from 'axios';
import { UserRequest, UserResponse } from '../types/user';

const apiUrl = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export const registerUser = async (data: UserRequest): Promise<UserResponse> => {
  const response = await api.post<UserResponse>('/register', data);
  return response.data;
};

export const loginUser = async (data: UserRequest): Promise<UserResponse> => {
  const response = await api.post<UserResponse>('/login', data);
  return response.data;
};

export const logoutUser = async (): Promise<UserResponse> => {
  const response = await api.post<UserResponse>('/logout');
  return response.data;
};

export const checkAuthStatus = async (): Promise<UserResponse> => {
  const response = await api.get<UserResponse>('/check-auth');
  return response.data;
};