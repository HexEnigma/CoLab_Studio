import axios from "axios";
import useAuthStore from "../store/authStore";

// Create a central Axios instance pointing to our Django server
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach the JWT Access Token to every outgoing request
api.interceptors.request.use(
  (config) => {
    // Read the token directly from our Zustand global store
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Note: We will add the Response Interceptor (for silent token refreshing)
// in a later optimization phase once basic login is working.

export default api;
