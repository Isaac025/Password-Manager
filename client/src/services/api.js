import axios from "axios";

const baseURL = import.meta.env.PROD
  ? "https://password-manager-ti6f.onrender.com/api"
  : import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";

const API = axios.create({ baseURL, timeout: 15000 });

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
