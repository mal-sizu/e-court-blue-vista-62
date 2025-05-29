import api from './api';

const hearingService = {
  getAllHearings: async (filters = {}) => {
    const response = await api.get('/hearing/all', { params: filters });
    return response.data;
  },

  getHearingById: async (id) => {
    const response = await api.get(`/hearings/${id}`);
    return response.data;
  },

  createHearing: async (hearingData) => {
    const response = await api.post('/hearing/create', hearingData);
    return response.data;
  },

  updateHearing: async (id, hearingData) => {
    const response = await api.put(`/hearings/${id}`, hearingData);
    return response.data;
  },

  deleteHearing: async (id) => {
    const response = await api.delete(`/hearings/${id}`);
    return response.data;
  },

  getHearingsByCase: async (caseId) => {
    const response = await api.get(`/hearings/case/${caseId}`);
    return response.data;
  },

  getUpcomingHearings: async () => {
    const response = await api.get('/hearings/upcoming');
    return response.data;
  },

  addHearingNotes: async (hearingId, notes) => {
    const response = await api.post(`/hearings/${hearingId}/notes`, { notes });
    return response.data;
  },

  updateHearingDocuments: async (formData) => {
    const response = await api.put('/hearing/documents', formData);
    return response.data;
  },

  updateHearingAdmin: async (formData) => {
    const response = await api.put('/hearing/updateadmin', formData);
    return response.data;
  },

  approveHearingReport: async (hearingData) => {
    const response = await api.put('/hearing/approve', hearingData);
    return response.data;
  }
};

export default hearingService; 