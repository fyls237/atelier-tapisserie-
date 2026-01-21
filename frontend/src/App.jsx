import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';

import AdminLayout from './layouts/AdminLayout';
import Finance from './pages/admin/Finance';

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
                        <Route element={<AdminLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="finance" element={<Finance />} />
                        </Route>
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
