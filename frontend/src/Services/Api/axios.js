import axios from 'axios'

const axiosClient = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL,
    withXSRFToken: true,
    withCredentials: true,
})


// before send Request  do this : add token
axiosClient.interceptors.request.use(
    (config) => {

      // Add authorization token to headers
      const token = localStorage.getItem('Token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }


      // Add language to the URL query parameters
      const locale = localStorage.getItem('locale') || 'fr';
      if (config.url.includes('?')) {
          config.url += `&locale=${locale}`;
      } else {
          config.url += `?locale=${locale}`;
      }


      return config;

    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );




export default axiosClient ;








