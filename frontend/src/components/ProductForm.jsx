import { useState, useEffect } from 'react';
import api from '../lib/axios';
import { X } from 'lucide-react'; // Assurez-vous d'avoir installé lucide-react ou utilisez du texte

export default function ProductForm({ product, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: 0,
        image: null
    });
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description || '',
                price: product.price,
                category: product.category || '',
                stock: product.stock,
                image: null
            });
            // Si l'image est locale au backend (commence par /static), on ajoute l'URL complète pour l'affichage
            if (product.image_url) {
                setPreview(product.image_url); // Le proxy gère /static
            }
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (product) {
                // Mode UPDATE (PUT) - Note: L'upload d'image en update n'est pas encore géré par le backend PUT actuel ?
                // Vérifions le backend... Le PUT attend un JSON body (ProductUpdate), pas un Multipart form ?
                // Ah, le backend ProductUpdate Pydantic attend du JSON. 
                // Si on veut update l'image, il faudrait adapter le backend ou faire 2 appels.
                // Pour la V1, faisons simple : Update des infos texte seulement pour l'instant via PUT.

                await api.put(`/products/${product.id}`, {
                    name: formData.name,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    category: formData.category,
                    stock: parseInt(formData.stock)
                });
            } else {
                // Mode CREATE (POST) - Multipart
                const data = new FormData();
                data.append('name', formData.name);
                data.append('price', formData.price);
                if (formData.description) data.append('description', formData.description);
                if (formData.category) data.append('category', formData.category);
                data.append('stock', formData.stock);
                if (formData.image) data.append('file', formData.image);

                await api.post('/products/', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            onSuccess();
        } catch (error) {
            console.error("Erreur save product", error);
            alert("Erreur lors de l'enregistrement");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {product ? 'Modifier Produit' : 'Nouveau Produit'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nom</label>
                        <input type="text" name="name" required
                            value={formData.name} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Prix (FCFA)</label>
                            <input type="number" name="price" required
                                value={formData.price} onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                            <input type="number" name="stock"
                                value={formData.stock} onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                        <input type="text" name="category"
                            value={formData.category} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" rows="3"
                            value={formData.description} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        />
                    </div>

                    {!product && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image</label>
                            <input type="file" onChange={handleFileChange} accept="image/*"
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                    )}

                    {preview && (
                        <div className="mt-2">
                            <img src={preview} alt="Prévisualisation" className="h-32 object-contain rounded border" />
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                        <button type="button" onClick={onClose} className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border rounded-md">
                            Annuler
                        </button>
                        <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50">
                            {loading ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
