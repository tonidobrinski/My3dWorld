import jwt_decode from "jwt-decode";

export const checkAuthStatus = () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    const user = jwt_decode(token); 
    return user;
  }
  return null; 
};
