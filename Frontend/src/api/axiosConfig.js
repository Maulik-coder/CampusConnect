import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

// Automatically add the token to EVERY request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Or wherever you store your JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;