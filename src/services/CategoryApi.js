import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const categoryService = {
  getAll: () => api.get('/categories/all'),
  getById: (id) => api.get(`/categories/${id}`),
  getByCode: (code) => api.get(`/categories/code/${code}`),
  create: (category) => api.post('/categories', category),
  update: (id, category) => api.put(`/categories/${id}`, category),
  delete: (id) => api.delete(`/categories/${id}`),
};

export default api;