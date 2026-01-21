import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Routes Publiques */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalogue" element={<Catalog />} />
                    </Route>

                    {/* Routes Admin */}
                    <Route path="/login" element={<Login />} />

                    <Route path="/admin" element={<ProtectedRoute />}>
                        <Route index element={<Dashboard />} />
                        {/* Autres routes admin ici */}
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
