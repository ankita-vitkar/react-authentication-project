import axios from "axios";
import { clearSession } from "../auth/session";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://reqres.in/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      clearSession();
      window.location.assign("/");
    }

    return Promise.reject(error);
  }
);

export default api;
