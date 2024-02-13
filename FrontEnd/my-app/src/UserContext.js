import React, { createContext, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("first_name", userData.user);
    localStorage.setItem("role", userData.role_id);
    localStorage.setItem("user_id", userData.user_id);
    console.log(userData.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("first_name");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
  };

  const value = {
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
