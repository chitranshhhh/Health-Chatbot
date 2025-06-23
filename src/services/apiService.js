import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5005/api', // Updated to use import.meta.env


  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async signup(username, email, password) {
    const response = await api.post('/auth/signup', { username, email, password });
    return response.data;
  },

  async logout(userId) {
    const response = await api.post('/auth/logout', { user_id: userId });
    return response.data;
  }
};
