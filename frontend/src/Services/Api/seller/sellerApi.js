import axiosClient from '../axios';

const sellerApi = {
  
  getCurrentSeller: async () => {
    return await axiosClient.get('/api/seller');
  },

  updateProfile: async (formData) => {
    return await axiosClient.patch('/api/seller/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  changePassword: async ({ currentPassword, newPassword, confirmPassword }) => {
    return await axiosClient.post('/api/seller/password', {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
  },

  toggleTwoFactor: async (enabled) => {
    return await axiosClient.post('/api/seller/two-factor', { enabled });
  },

  getSessions: async () => {
    return await axiosClient.get('/api/seller/sessions');
  },

  logoutOtherDevices: async () => {
    return await axiosClient.post('/api/seller/logout-other-sessions');
  },

  sendEmailVerification: async () => {
    return await axiosClient.post('/api/seller/email/verification-notification');
  },

  deleteAccount: async (data) => {
    return await axiosClient.delete('/api/seller/profile', { data });
  },

  verifyTwoFactor: async ({ email, code }) => {
    return await axiosClient.post('/api/seller/two-factor/verify', { email, code });
  },
};

export { sellerApi };