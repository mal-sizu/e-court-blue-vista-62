import api from './api';

export const createCaseRequest = async (formData) => {
  const response = await api.post('/caserequest/create', formData);
  return response.data;
};

export const updateCaseRequest = async (formData) => {
  const response = await api.put('/caserequest/update', formData);
  return response.data;
};

export const getAllCaseRequests = async (filters = {}) => {
  const response = await api.get('/caserequest/allfilter', { params: filters });
  return response.data;
};

export const deleteCaseRequest = async (requestNumber) => {
  const response = await api.delete('/caserequest/delete', { 
    data: { requestNumber } 
  });
  return response.data;
};

export const updateCaseRequestStatus = async (requestNumber, status) => {
  const response = await api.put('/caserequest/status', {
    requestNumber,
    status
  });
  return response.data;
}; 