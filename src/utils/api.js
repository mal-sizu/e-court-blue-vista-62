
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data)
};

export const caseRequestAPI = {
  create: (data) => api.post('/case-requests', data),
  getAll: (params) => api.get('/case-requests', { params }),
  getById: (id) => api.get(`/case-requests/${id}`),
  update: (id, data) => api.put(`/case-requests/${id}`, data),
  approve: (id) => api.patch(`/case-requests/${id}/approve`),
  reject: (id, reason) => api.patch(`/case-requests/${id}/reject`, { reason })
};

export const caseAPI = {
  getAll: (params) => api.get('/cases', { params }),
  getById: (id) => api.get(`/cases/${id}`),
  create: (data) => api.post('/cases', data)
};

export default api;
