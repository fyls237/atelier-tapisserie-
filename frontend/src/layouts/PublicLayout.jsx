import { Link, Outlet } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function PublicLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
            {/* Navbar */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="text-2xl font-bold text-gray-900 font-serif tracking-tight">
                                Atelier<span className="text-amber-700">Tapisserie</span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden sm:flex sm:items-center sm:space-x-8">
                            <Link to="/" className="text-gray-600 hover:text-amber-700 font-medium transition">
                                Accueil
                            </Link>
                            <Link to="/services" className="text-gray-600 hover:text-amber-700 font-medium transition">
                                Nos Services
                            </Link>
                            <Link to="/catalogue" className="text-gray-600 hover:text-amber-700 font-medium transition">
                                Catalogue
                            </Link>
                            <Link to="/login" className="text-gray-400 hover:text-gray-600 text-sm font-medium transition">
                                Admin
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="sm:hidden bg-white border-b border-gray-100">
                        <div className="pt-2 pb-3 space-y-1">
                            <Link
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-amber-700 hover:bg-gray-50"
                            >
                                Accueil
                            </Link>
                            <Link
                                to="/services"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-amber-700 hover:bg-gray-50"
                            >
                                Nos Services
                            </Link>
                            <Link
                                to="/catalogue"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-amber-700 hover:bg-gray-50"
                            >
                                Catalogue
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold font-serif">Atelier Tapisserie</h3>
                        <p className="text-gray-400 text-sm mt-1">L'art du bois et du confort.</p>
                    </div>
                    <div className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Tous droits réservés.
                    </div>
                </div>
            </footer>
        </div>
    );
}
