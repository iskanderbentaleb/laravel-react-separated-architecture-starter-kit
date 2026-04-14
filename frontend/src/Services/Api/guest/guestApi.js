// we call this code in user Context

import axiosClient from "../axios";

const guestApi = {
    getCsrfToken: async () => {
        // fetch the CSRF token
        return await axiosClient.get('/sanctum/csrf-cookie');
    },
    login: async (email, password) => {
        // send request to get session and put in the browser
        return await axiosClient.post('/login', { email, password });
    },
    register: async (name, email, password , password_confirmation) => {
        return await axiosClient.post('/register', { name, email, password, password_confirmation });
    },
    forgotPassword: async (email) => {
        return await axiosClient.post('/forgot-password', { email });
    },
    resetPassword: async ({ token, email, password , password_confirmation }) => {
        return await axiosClient.post('/reset-password', { token, email, password , password_confirmation });
    },
    logout: async () => {
        // send request to get destroy session
        return await axiosClient.post('/logout');
    },
    getUser: async (path) => {
        // get user information
        return await axiosClient.get(`/api/${path}`)
    },
    setLanguage: async (lang) => {
        // get user information
        // return await axiosClient.get(`/set-locale/${lang}`)
        return lang;
    },
}

export { guestApi };


// we call this code in user Context
