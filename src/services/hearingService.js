import api from './api';

const hearingService = {
  getAllHearings: async () => {
    const response = await api.get('/hearings');
    return response.data;
  },

  getHearingById: async (id) => {
    const response = await api.get(`/hearings/${id}`);
    return response.data;
  },

  createHearing: async (hearingData) => {
    const response = await api.post('/hearings', hearingData);
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
  }
};

export default hearingService; 