// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

const register = (username,email, password, roles) => {
  return axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
    roles,
  });
};

const login = (username, password) => {
  return axios.post(`${API_URL}/login`, {
    username,
    password,
  }).then((response) => {
    if (response.data.username) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;

