import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface User {
  id: string;
  displayName: string;
  email?: string;
  avatar?: string;
  role: 'Client' | 'Photographer' | 'Admin';
}

export type UserRole = 'Client' | 'Photographer' | 'Admin' | null;

export interface AuthContextType {
  user: User | null;
  role: UserRole;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  init: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!token;

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    setRole(newUser.role);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const init = async () => {
    setIsLoading(true);
    try {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (savedToken && savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(parsedUser);
        setRole(parsedUser.role);
      }
    } catch (error) {
      console.error('Auth init error:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, role, token, isAuthenticated, login, logout, init }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;