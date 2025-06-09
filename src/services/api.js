import axios from 'axios';

const API_URL = 'http://localhost:7289/api';  // Changed to HTTP for local development

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('API Error Response:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('API Error Request:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('API Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export const register = (user) => api.post('/Auth/register', user);
export const login = (credentials) => api.post('/Auth/login', credentials);
export const getEmployees = () => api.get('/Employees');
export const createEmployee = (employee) => api.post('/Employees', employee);
export const updateEmployee = (id, employee) => api.put(`/Employees/${id}`, employee);
export const deleteEmployee = (id) => api.delete(`/Employees/${id}`);