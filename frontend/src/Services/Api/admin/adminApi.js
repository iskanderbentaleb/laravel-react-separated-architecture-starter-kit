import axiosClient from '../axios';

const adminApi = {
  getCurrentAdmin: async () => {
    return await axiosClient.get('/api/admin');
  },

  updateProfile: async (formData) => {
    return await axiosClient.patch('/api/admin/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  changePassword: async ({ currentPassword, newPassword, confirmPassword }) => {
    return await axiosClient.post('/api/admin/password', {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
  },

  toggleTwoFactor: async (enabled) => {
    return await axiosClient.post('/api/admin/two-factor', { enabled });
  },

  getSessions: async () => {
    return await axiosClient.get('/api/admin/sessions');
  },

  logoutOtherDevices: async () => {
    return await axiosClient.post('/api/admin/logout-other-sessions');
  },

  sendEmailVerification: async () => {
    return await axiosClient.post('/api/admin/email/verification-notification');
  },

  deleteAccount: async (data) => {
    return await axiosClient.delete('/api/admin/profile', { data });
  },

  verifyTwoFactor: async ({ email, code }) => {
    return await axiosClient.post('/api/admin/two-factor/verify', { email, code });
  },
};

export { adminApi };