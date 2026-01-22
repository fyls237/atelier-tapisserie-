import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/axios';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import ProductForm from '../components/ProductForm';

export default function Dashboard() {
    const { logout } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products/');
            setProducts(res.data);
        } catch (error) {
            console.error("Erreur chargement produits", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error("Erreur suppression", error);
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingProduct(null);
        fetchProducts();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar supprimée (gérée par AdminLayout) */}

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Header Actions */}
                <div className="px-4 sm:px-0 flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Produits</h2>
                    <button
                        onClick={handleAddNew}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        <Plus size={20} className="mr-2" />
                        Nouveau Produit
                    </button>
                </div>

                {/* Product List */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Chargement...</div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {products.map((product) => (
                                <li key={product.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        {product.image_url ? (
                                            <img src={product.image_url} alt={product.name} className="h-16 w-16 object-cover rounded bg-gray-200" />
                                        ) : (
                                            <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">Sans img</div>
                                        )}
                                        <div>
                                            <p className="text-lg font-medium text-gray-900">{product.name}</p>
                                            <p className="text-sm text-gray-500">{product.category} • Stock: {product.stock}</p>
                                            <p className="text-sm font-bold text-blue-600">{product.price.toLocaleString()} FCFA</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="p-2 text-gray-400 hover:text-blue-600"
                                            title="Modifier"
                                        >
                                            <Pencil size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 text-gray-400 hover:text-red-600"
                                            title="Supprimer"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                            {products.length === 0 && (
                                <li className="p-8 text-center text-gray-500">Aucun produit pour le moment.</li>
                            )}
                        </ul>
                    )}
                </div>
            </main>

            {/* Modal Form */}
            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onClose={() => setShowForm(false)}
                    onSuccess={handleFormSuccess}
                />
            )}
        </div>
    );
}
