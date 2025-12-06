import axios from "axios";

import router from "../router/router";
import { UI } from "../controller/UIController";
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
        localStorage.clear();
        UI.loadNavbarUser();
        UI.loadSidebarUser();
        Toast.error("Vui lòng đăng nhập.");
        router.navigate("/login");
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
        processQueue(null, access_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        return httpsRequest(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.clear();
        UI.loadNavbarUser();
        UI.loadSidebarUser();
        Toast.error("Phiên đăng nhập đã hết hạn.");
        router.navigate("/login");

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default httpsRequest;
