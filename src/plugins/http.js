import axios from 'axios';
import pinia from '@/store/pinia.js';

const axiosInstance = axios.create({
  baseURL: 'https://9cd0-2400-adc1-49e-3300-d007-5616-7a89-f8d2.ngrok-free.app/sas/v1/',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

pinia.use(({ store }) => {
  store.$http = axiosInstance;
});

export default {
  install(app) {
    app.config.globalProperties.$http = axiosInstance;
  },
};
