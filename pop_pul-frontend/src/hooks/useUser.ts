import { useState } from 'react';

interface User {
  id: string;
  name: string;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  return { user, isLoading, showLoginPopup, setShowLoginPopup };
}; 