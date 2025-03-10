export interface User {
  id: string;
  nickname: string;
  username: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (data: {
    nickname: string;
    username: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}
