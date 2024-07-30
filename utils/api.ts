// utils/api.ts

import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // Update this with your server's URL
});

// Intercept requests to include the JWT token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
