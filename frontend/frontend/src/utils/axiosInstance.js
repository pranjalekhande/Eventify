import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api", // Backend API URL
});

// Add an interceptor to attach the JWT token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
