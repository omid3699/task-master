import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/accounts/login/', credentials);
    return response.data;
  },
  signup: async (credentials: SignupCredentials) => {
    const response = await api.post('/accounts/signup/', credentials);
    return response.data;
  },
};

export const tasks = {
  getAll: async () => {
    const response = await api.get('/tasks/');
    return response.data;
  },
  get: async (id: number) => {
    const response = await api.get(`/tasks/${id}/`);
    return response.data;
  },
  create: async (task: CreateTaskInput) => {
    const response = await api.post('/tasks/', task);
    return response.data;
  },
  update: async (id: number, task: Partial<CreateTaskInput>) => {
    const response = await api.patch(`/tasks/${id}/`, task);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/tasks/${id}/`);
  },
};

export default api;