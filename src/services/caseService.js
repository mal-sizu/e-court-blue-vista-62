import api from './api';

const caseService = {
  getAllCases: async () => {
    const response = await api.get('/cases');
    return response.data;
  },

  getCaseById: async (id) => {
    const response = await api.get(`/cases/${id}`);
    return response.data;
  },

  createCase: async (caseData) => {
    const response = await api.post('/cases', caseData);
    return response.data;
  },

  updateCase: async (id, caseData) => {
    const response = await api.put(`/cases/${id}`, caseData);
    return response.data;
  },

  deleteCase: async (id) => {
    const response = await api.delete(`/cases/${id}`);
    return response.data;
  },

  getCaseDocuments: async (caseId) => {
    const response = await api.get(`/cases/${caseId}/documents`);
    return response.data;
  },

  uploadCaseDocument: async (caseId, documentData) => {
    const formData = new FormData();
    formData.append('file', documentData);
    const response = await api.post(`/cases/${caseId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getCaseTimeline: async (caseId) => {
    const response = await api.get(`/cases/${caseId}/timeline`);
    return response.data;
  }
};

export default caseService; 