import api from './api';
import { jwtDecode } from 'jwt-decode';

const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  verifyOTPLogin: async (otpData) => {
    const response = await api.post('/auth/login-verifyotp', otpData);
    return response.data;
  },

  verifyEmail: async (token) => {
    const response = await api.get(`/auth/verify-email/${token}`);
    return response.data;
  },

  verifyUpdatedEmail: async (token) => {
    const response = await api.get(`/auth/verify-new-email/${token}`);
    return response.data;
  },

  resetPassword: async (email) => {
    const response = await api.post('/auth/resetpassword', { email });
    return response.data;
  },

  resetPasswordVerify: async (token, newPassword) => {
    const response = await api.post('/auth/resetpassword-verify', { token, newPassword });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('token');
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  getDashboardStats: async (token) => {
    const response = await fetch('/api/dashboard/stats', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch dashboard stats');
    return response.json();
  }
};

export default authService; 