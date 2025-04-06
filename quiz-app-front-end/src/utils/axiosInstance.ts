import axios from "axios";
import { prefix } from "../enums/prefix";

// Create an Axios instance
const api = axios.create({
  baseURL: prefix || "http://localhost:3000", 
});

// Request Interceptor to add JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debugging line to check the token value
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
