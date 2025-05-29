import api from './api';

const caseService = {
  getAllCases: async () => {
    const response = await api.get('/case');
    return response.data;
  },

  getCaseById: async (id) => {
    const response = await api.get(`/case/${id}`);
    return response.data;
  },

  createCase: async (formData) => {
    const response = await api.post('/case/create', formData);
    return response.data;
  },

  updateCase: async (formData) => {
    const response = await api.put('/case/update', formData);
    return response.data;
  },

  deleteCase: async (caseID) => {
    const response = await api.delete(`/case/${caseID}`);
    return response.data;
  },

  getCaseDocuments: async (caseId) => {
    const response = await api.get(`/case/${caseId}/documents`);
    return response.data;
  },

  uploadCaseDocument: async (caseId, documentData) => {
    const formData = new FormData();
    formData.append('file', documentData);
    const response = await api.post(`/case/${caseId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getCaseTimeline: async (caseId) => {
    const response = await api.get(`/case/${caseId}/timeline`);
    return response.data;
  },

  searchCases: async (filters = {}) => {
    const response = await api.get('/case/search', { params: filters });
    return response.data;
  }
};

export default caseService; 