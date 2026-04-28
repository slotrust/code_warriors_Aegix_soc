import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';

interface AuthContextType {
  user: User | { uid: string; email: string; isMock: boolean } | null;
  loading: boolean;
  setMockUser: (user: { uid: string; email: string; isMock: boolean } | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setMockUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | { uid: string; email: string; isMock: boolean } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      // Don't override if we have a mock user
      setUser((prev) => {
        if (prev && 'isMock' in prev && prev.isMock) return prev;
        return usr;
      });
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const setMockUser = (mockUser: { uid: string; email: string; isMock: boolean } | null) => {
    setUser(mockUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setMockUser }}>
        {children}
    </AuthContext.Provider>
  );
};

