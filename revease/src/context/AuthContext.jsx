import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin, logout as apiLogout } from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUser(storedUsername);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const data = await apiLogin(username, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);

      setToken(data.token);
      setUser(username);
      setError(null);
    } catch (err) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
      console.error("Error during login:", err);
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setToken(null);
      setUser(null);

      localStorage.removeItem("token");
      localStorage.removeItem("username");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
