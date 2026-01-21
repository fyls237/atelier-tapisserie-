import { createContext, useState, useContext, useEffect } from 'react';
import api from '../lib/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Vérifier le token au chargement
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // On pourrait avoir un endpoint /auth/me pour valider le token et récupérer l'user
                    // Pour l'instant on décode basiquement ou on considère logged in.
                    // Idéalement : await api.get('/auth/me')
                    setUser({ role: 'admin' }); // Placeholder, à améliorer avec un endpoint /me
                } catch (error) {
                    console.error("Auth check failed", error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        // API call expects URLSearchParams for OAuth2PasswordRequestForm
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        const response = await api.post('/auth/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token } = response.data;
        localStorage.setItem('token', access_token);
        setUser({ email, role: 'admin' }); // On assume admin pour l'instant
        return true;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
