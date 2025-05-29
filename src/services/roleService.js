import api from './api';

export const createRole = async (roleData) => {
  const response = await api.post('/role/create', roleData);
  return response.data;
};

export const updateRole = async (roleData) => {
  const response = await api.put('/role/update', roleData);
  return response.data;
};

export const deleteRole = async (roleId) => {
  const response = await api.delete('/role/delete', { 
    data: { roleId } 
  });
  return response.data;
};

export const findRole = async (roleId) => {
  const response = await api.post('/role/findrole', { roleId });
  return response.data;
};

export const findRoles = async (filters = {}) => {
  const response = await api.get('/role/findroles', { params: filters });
  return response.data;
}; 