import React, { useState } from "react";

import { AuthContext, authContextDefaults } from "./AuthContext";

interface IProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: IProps) => {
  const [state, setState] = useState<any>(authContextDefaults);

  return (
    <AuthContext.Provider value={{ ...state, setState }}>
      {children}
    </AuthContext.Provider>
  );
};
