import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // Đúng với file .env
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});



apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('USER_LOGIN');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
