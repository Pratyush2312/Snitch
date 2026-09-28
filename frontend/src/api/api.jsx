import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use((response) => response,
  async (error) => { 
    if (error.response.status === 401) { 
      const res = await api.post("/auth/refresh-token");
      localStorage.setItem("accessToken", res.data.data.accessToken);
    }
    return Promise.reject(error);
  }
);

export default api;
