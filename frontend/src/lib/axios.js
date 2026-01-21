import axios from 'axios';

// Instance Axios
// Base URL relative pour profiter du Proxy Vite en dev
// En prod, ce sera l'URL du domaine ou via Nginx
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les erreurs (ex: 401 Unauthorized -> Logout)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token invalide ou expiré
            // localStorage.removeItem('token');
            // window.location.href = '/login'; 
            // (On commentera la redirection tant qu'on n'a pas la route login)
        }
        return Promise.reject(error);
    }
);

export default api;
