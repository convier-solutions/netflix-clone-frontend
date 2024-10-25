import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.0.216:5000/api",
  withCredentials: true,
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  response => {
    if (response?.data?.status === 417) {
      localStorage.removeItem('authToken');
      window.location.reload();
      return Promise.reject(new Error("Session expired"));
    }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          break;
        case 404:
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default API;
