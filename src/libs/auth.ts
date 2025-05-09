import { store } from "@/store";
import axios from "axios";

export const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

authAxios.interceptors.request.use((config) => {
  const token = store.getState().auth.RefreshToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
