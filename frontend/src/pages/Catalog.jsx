import { useState, useEffect } from 'react';
import api from '../lib/axios';
import ProductCard from '../components/ProductCard';

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('Tout');

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await api.get('/products/');
                setProducts(res.data);
            } catch (error) {
                console.error("Impossible de charger les produits", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // Extraction unique des catégories
    const categories = ['Tout', ...new Set(products.map(p => p.category).filter(Boolean))];

    const filteredProducts = filter === 'Tout'
        ? products
        : products.filter(p => p.category === filter);

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

                {/* Header Catalogue — typographie forte */}
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">
                        Notre Catalogue
                    </h1>
                    <p className="text-gray-500 text-lg max-w-xl">
                        Découvrez nos créations uniques. Chaque pièce est conçue pour durer et embellir votre intérieur.
                    </p>
                </div>

                {/* Filtres Catégories — Pills Airbnb */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${filter === cat
                                ? 'bg-gray-900 text-white shadow-sm'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grille Produits */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20 text-gray-400">
                                Aucun produit trouvé dans cette catégorie.
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
