import { authService } from "./api";
import { User } from "../types/auth";

export const login = async (
  username: string,
  password: string
): Promise<User> => {
  const response = await authService.login(username, password);
  return response.user;
};

export const signup = async (
  username: string,
  password: string,
  nickname: string
): Promise<User> => {
  const response = await authService.signup(username, password, nickname);
  return response.user;
};

export const logout = async (): Promise<void> => {
  await authService.logout();
};

export const getCurrentUser = async (): Promise<User> => {
  return await authService.getCurrentUser();
};
