import axios from 'axios';
import store from '../store/store';
import { refreshSuccess, logout } from '../store/slices/authSlice';
import config from '../config';

const API = config.API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
});

// Request: token header add
axiosInstance.interceptors.request.use((cfg) => {
  const token = store.getState().auth.accessToken;
  if (token) cfg.headers['Authorization'] = `Bearer ${token}`;
  return cfg;
});

// Response: 401 → refresh token
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const res = await axios.post(`${API}/customer/auth/refresh`, {}, { withCredentials: true });
        store.dispatch(refreshSuccess({ accessToken: res.data.accessToken, user: res.data.user }));
        original.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
        return axiosInstance(original);
      } catch {
        store.dispatch(logout());
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;