import api from './api';

export const authenticateForRecordRoom = async (credentials) => {
  const response = await api.post('/record-room/login', credentials);
  return response.data;
};

export const verifyOTPLoginRecordRoom = async (otpData) => {
  const response = await api.post('/record-room/record-room-login-verifyotp', otpData);
  return response.data;
};

export const requestAccess = async (requestData) => {
  const response = await api.post('/record-room/request-access', requestData);
  return response.data;
};

export const getUserAccessHistory = async () => {
  const response = await api.get('/record-room/history');
  return response.data;
};

export const getPendingRequests = async () => {
  const response = await api.get('/record-room/pending-requests');
  return response.data;
};

export const processAccessRequest = async (requestData) => {
  const response = await api.put('/record-room/process-request', requestData);
  return response.data;
};

export const validateExistingAccess = async (accessData) => {
  const response = await api.put('/record-room/existing', accessData);
  return response.data;
};

export const getAllRecords = async () => {
  const response = await api.get('/record-room/records');
  return response.data;
}; 