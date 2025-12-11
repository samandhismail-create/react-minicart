import React from "react";

export interface AuthContextInterface {
  isAuthenticated: boolean;
  setState: any;
}

export const authContextDefaults: AuthContextInterface = {
  isAuthenticated: false,
  setState: {
    isAuthenticated: false
  }
};

export const AuthContext = React.createContext<AuthContextInterface>(
  authContextDefaults
);