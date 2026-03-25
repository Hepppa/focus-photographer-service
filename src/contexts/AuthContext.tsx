import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'Client' | 'Photographer' | 'Admin' | null;

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  init: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    setRole(newUser.role);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const init = () => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setToken(savedToken);
      setUser(parsedUser);
      setRole(parsedUser.role);
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, token, isAuthenticated, login, logout, init }}>
      {children}
    </AuthContext.Provider>
  );
};
