import api from './api';

const notificationService = {
  getUserNotifications: async (limit = 20, skip = 0) => {
    const response = await api.get('/notifications', {
      params: { limit, skip }
    });
    return response.data;
  },

  getUnreadNotifications: async () => {
    const response = await api.get('/notifications/unread');
    return response.data;
  },

  markAsRead: async (notificationId) => {
    const response = await api.patch(`/notifications/${notificationId}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.patch('/notifications/read-all');
    return response.data;
  },

  deleteNotification: async (notificationId) => {
    const response = await api.delete(`/notifications/${notificationId}`);
    return response.data;
  },

  getNotificationPreferences: async () => {
    const response = await api.get('/notifications/preferences');
    return response.data;
  },

  updateNotificationPreferences: async (preferences) => {
    const response = await api.put('/notifications/preferences', preferences);
    return response.data;
  }
};

export default notificationService; 