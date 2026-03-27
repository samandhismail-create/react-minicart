import React from "react";

export interface AuthContextInterface {
  isAuthenticated: boolean;
  setAuth: (auth: boolean) => void;
}

export const authContextDefaults: AuthContextInterface = {
  isAuthenticated: false,
  setAuth: () => {} 
};

export const AuthContext = React.createContext<AuthContextInterface>(
  authContextDefaults
);
