import axios from 'axios';
import { getAuthToken } from '../shared/Untils';
import { API_ENDPOINT } from '../shared/Constant';

// Create an instance of Axios with a custom config
const axiosInstance = axios.create({
  baseURL: API_ENDPOINT, // Your base URL here
});

// Add a request interceptor to the instance
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here if needed
    config.headers.Authorization =  `Bearer ${getAuthToken()}`;
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to the instance
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data here if needed
    return response;
  },
  (error) => {
    // Handle response errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
