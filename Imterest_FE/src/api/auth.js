import apiClient from './apiClient';

export const login = async (email, password) => {
    try {
        const res = await apiClient.post('/auth/login', { email, password });
        // console.log("Login API Response:", res.data);
        return { token: res.data };  // ✅ Bọc lại token vào object
    } catch (error) {
        // console.error('Login error:', error.response?.data?.message || error.message);
        return null;
    }
};




export const register = async (name, email, password) => {
    try {
        const res = await apiClient.post('/auth/register', { name, email, password });
        // console.log(res);
        return res.data;
    } catch (error) {
        // console.error('Register error:', error.response?.data?.message || error.message);
        return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
};

