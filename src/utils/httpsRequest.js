import axios from "axios";
import { Toast } from "../components/Toast";

const baseURL = import.meta.env.VITE_BASE_URL;

const httpsRequest = axios.create({
  baseURL,
});

httpsRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

httpsRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return httpsRequest(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.post(`${baseURL}/auth/refresh-token`, {
          refreshToken,
        });

        const { access_token, refresh_token } = res.data;

        localStorage.setItem("token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        httpsRequest.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        processQueue(null, access_token);

        return httpsRequest(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        window.location.href = "/login";
        Toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default httpsRequest;
