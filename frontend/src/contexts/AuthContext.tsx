import React, { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "@/lib/axiosClient";

type AuthState = {
  token: string | null;
  email?: string | null;
  isAuthenticated: boolean;
};

type LoginDto = { email: string; password: string };
type AuthContextType = {
  auth: AuthState;
  login: (dto: LoginDto) => Promise<void>;
  logout: () => void;
  setTokenManually: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem("token");
    } catch {
      return null;
    }
  });
  const [email, setEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem("userEmail");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (email) {
      localStorage.setItem("userEmail", email);
    } else {
      localStorage.removeItem("userEmail");
    }
  }, [email]);

  const login = async (dto: LoginDto) => {
    // Ajuste a rota e shape do retorno conforme seu backend
    const res = await apiClient.post<{ token: string; email?: string }>(
      "/users/login",
      dto
    );
    const receivedToken = res.data.token;
    setToken(receivedToken);
    if (res.data.email) setEmail(res.data.email);
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
  };

  const setTokenManually = (t: string | null) => setToken(t);

  const value: AuthContextType = {
    auth: { token, email, isAuthenticated: !!token },
    login,
    logout,
    setTokenManually,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
