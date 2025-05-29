import api from './api';

const dashboardService = {
  getDashboardStats: async (token) => {
    const response = await api.get('/dashboard/stats', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  refreshDashboardStats: async () => {
    const response = await api.post('/dashboard/refresh');
    return response.data;
  },

  getRecentCases: async () => {
    const response = await api.get('/dashboard/recent-cases');
    return response.data;
  },

  getUpcomingHearings: async () => {
    const response = await api.get('/dashboard/upcoming-hearings');
    return response.data;
  },

  getCaseDistribution: async () => {
    const response = await api.get('/dashboard/case-distribution');
    return response.data;
  },

  getActivityTimeline: async () => {
    const response = await api.get('/dashboard/activity-timeline');
    return response.data;
  },

  getPerformanceMetrics: async () => {
    const response = await api.get('/dashboard/performance-metrics');
    return response.data;
  }
};

export default dashboardService; 