import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const login = (credentials) => API.post('/token/', credentials);
export const getReminders = (token) =>
  API.get('/reminders/', { headers: { Authorization: `Bearer ${token}` } });
export const createReminder = (data, token) =>
  API.post('/reminders/', data, { headers: { Authorization: `Bearer ${token}` } });
export const updateReminder = (id, data, token) =>
  API.put(`/reminders/${id}/`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteReminder = (id, token) =>
  API.delete(`/reminders/${id}/`, { headers: { Authorization: `Bearer ${token}` } });