import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const utilisateurService = {
  getAll: () => api.get('/utilisateurs'),
  getById: (id) => api.get(`/utilisateurs/${id}`),
  getByEmail: (email) => api.get(`/utilisateurs/email/${email}`),
  create: (user) => api.post('/utilisateurs', user),
  update: (id, user) => api.put(`/utilisateurs/${id}`, user),
  delete: (id) => api.delete(`/utilisateurs/${id}`),
};

export default api;