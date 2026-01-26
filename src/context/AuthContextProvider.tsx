import React, { useState } from "react";
import { AuthContext, authContextDefaults } from "./AuthContext";

interface IProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: IProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("login") === "true" ||
      authContextDefaults.isAuthenticated
  );

  const setAuth = (auth: boolean) => {
    setIsAuthenticated(auth);
    localStorage.setItem("login", auth ? "true" : "false");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
