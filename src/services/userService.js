import api from './api';

const userService = {
  registerUser: async (formData) => {
    const response = await api.post('/user/register', formData);
    return response.data;
  },

  registerUserEmergency: async (formData) => {
    const response = await api.post('/user/registeremegency', formData);
    return response.data;
  },

  updateUser: async (formData) => {
    const response = await api.put('/user/update', formData);
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete('/user/delete', {
      data: { userId }
    });
    return response.data;
  },

  findUser: async (userData) => {
    const response = await api.post('/user/finduser', userData);
    return response.data;
  },

  findUsers: async () => {
    const response = await api.get('/user/findusers');
    return response.data;
  },

  suspendUser: async (userData) => {
    const response = await api.put('/user/suspend', userData);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get('/user/');
    return response.data;
  } 

};

export default userService; 



