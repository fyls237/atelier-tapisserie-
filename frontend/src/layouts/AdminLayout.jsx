import { Link, Outlet } from 'react-router-dom';
import { LogOut, Home, LayoutDashboard, Calculator } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
    const { logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <h1 className="text-xl font-bold text-gray-800">Admin</h1>

                            <div className="hidden md:flex space-x-4">
                                <Link to="/admin" className="text-gray-600 hover:text-blue-600 flex items-center px-3 py-2 rounded-md text-sm font-medium">
                                    <LayoutDashboard size={18} className="mr-2" /> Produits
                                </Link>
                                <Link to="/admin/finance" className="text-gray-600 hover:text-blue-600 flex items-center px-3 py-2 rounded-md text-sm font-medium">
                                    <Calculator size={18} className="mr-2" /> Finance
                                </Link>
                                <a href="/" target="_blank" className="text-gray-400 hover:text-gray-600 flex items-center px-3 py-2 rounded-md text-sm font-medium">
                                    <Home size={18} className="mr-2" /> Voir Site
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <button
                                onClick={logout}
                                className="flex items-center text-gray-600 hover:text-red-600 transition p-2"
                                title="Déconnexion"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
}
