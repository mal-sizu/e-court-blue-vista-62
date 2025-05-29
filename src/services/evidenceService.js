import api from './api';

export const createEvidence = async (formData) => {
  const response = await api.post('/evidence/create', formData);
  return response.data;
};

export const updateEvidence = async (formData) => {
  const response = await api.put('/evidence/update', formData);
  return response.data;
};

export const searchEvidence = async (filters = {}) => {
  const response = await api.get('/evidence/search', { params: filters });
  return response.data;
}; 