import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL
});

// Add request interceptor to add authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication API
export const login = async (username, password) => {
  try {
    // Check for hardcoded admin credentials
    if (username === 'admin' && password === 'admin') {
      // Return mock successful login response
      return {
        token: 'mock-admin-token-123456789',
        user: {
          id: 1,
          username: 'admin',
          name: 'Admin User',
          email: 'admin@shopease.com'
        }
      };
    }
    
    // If not using hardcoded credentials, try the real API
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Products API
export const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getAllCategories
}; 