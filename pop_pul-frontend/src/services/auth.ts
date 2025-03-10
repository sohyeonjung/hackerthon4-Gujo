import { api } from "./api";

export interface User {
  id: string;
  nickname: string;
  username: string;
}

export const authService = {
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>("/auth/me");
    return response.data;
  },

  login: async (username: string, password: string): Promise<User> => {
    const response = await api.post<User>("/auth/login", {
      username,
      password,
    });
    return response.data;
  },

  signup: async (data: {
    nickname: string;
    username: string;
    password: string;
  }): Promise<User> => {
    const response = await api.post<User>("/auth/signup", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },
};
