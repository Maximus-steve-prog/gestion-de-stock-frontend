import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const articleService = {
  getAll: () => api.get('/articles/all'),
  getById: (id) => api.get(`/articles/${id}`),
  getByCodearticle: (codearticle) => api.get(`/articles/codearticle/${codearticle}`),
  create: (article) => api.post('/articles', article),
  update: (id, article) => api.put(`/articles/${id}`, article),
  delete: (id) => api.delete(`//${id}`),
};

export default api;