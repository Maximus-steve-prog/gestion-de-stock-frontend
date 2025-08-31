import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export const clientService = {
  // ✅ SANS "/all" !
  getAll: () => api.get('/clients'),
  getById: (id) => api.get(`/clients/${id}`),
  getByEmail: (email) => api.get(`/clients/email/${email}`),
  create: (client) => api.post('/clients', client),
  update: (id, client) => api.put(`/clients/${id}`, client),
  delete: (id) => api.delete(`/clients/${id}`),
};

export default api;