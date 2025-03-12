import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  showLoginPopup: boolean;
  setShowLoginPopup: (show: boolean) => void;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, showLoginPopup, setShowLoginPopup, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 