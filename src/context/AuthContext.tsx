import React, { createContext, useContext, useState } from "react";

export interface User {
  id: string;
  name: string;
  phone: string;
  address: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (phone: string, password: string) => boolean;
  signup: (name: string, phone: string, address: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple in-memory store for demo
const usersDb: Array<User & { password: string }> = [
  { id: "admin-1", name: "Admin", phone: "9999999999", address: "Shop Address", password: "admin123", isAdmin: true },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (phone: string, password: string) => {
    const found = usersDb.find((u) => u.phone === phone && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return true;
    }
    return false;
  };

  const signup = (name: string, phone: string, address: string, password: string) => {
    if (usersDb.find((u) => u.phone === phone)) return false;
    const newUser = { id: `user-${Date.now()}`, name, phone, address, password, isAdmin: false };
    usersDb.push(newUser);
    const { password: _, ...userData } = newUser;
    setUser(userData);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
