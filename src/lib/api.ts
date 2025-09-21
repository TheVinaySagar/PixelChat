import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('API Base URL:', API_BASE_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for CORS with credentials
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, remove it
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  signIn: async (email: string, password: string) => {
    console.log('Attempting to sign in with:', email)
    const response = await api.post('/auth/signin', { email, password });
    console.log('Sign in response:', response.data)
    return response.data;
  },

  signUp: async (email: string, password: string) => {
    console.log('Attempting to sign up with:', email)
    const response = await api.post('/auth/signup', { email, password });
    console.log('Sign up response:', response.data)
    return response.data;
  },

  signOut: async () => {
    const response = await api.post('/auth/signout');
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateCredits: async (credits: number) => {
    const response = await api.patch('/auth/credits', { credits });
    return response.data;
  },
};

export default api;
