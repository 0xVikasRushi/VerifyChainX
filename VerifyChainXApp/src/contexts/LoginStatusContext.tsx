import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoginStatusContextData {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const LoginStatusContext = createContext<LoginStatusContextData | undefined>(undefined);

export const LoginStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const contextValue: LoginStatusContextData = {
    isLoggedIn,
    login,
    logout,
  };

  return <LoginStatusContext.Provider value={contextValue}>{children}</LoginStatusContext.Provider>;
};

export const useLoginStatus = () => {
  const context = useContext(LoginStatusContext);

  if (!context) {
    throw new Error("useLoginStatus must be used within a LoginStatusProvider");
  }

  return context;
};
