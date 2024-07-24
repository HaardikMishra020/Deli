// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8055',
  headers: {
    'Content-Type': 'application/json'
  } // Your Directus base URL
});

export default axiosInstance;
