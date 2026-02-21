import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
        <Link
            to={`/produit/${product.id}`}
            className="group block rounded-xl overflow-hidden bg-white transition-shadow duration-300 shadow-sm hover:shadow-md"
        >
            {/* Image — ~70% de la carte */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-300 text-sm">
                        Pas d'image
                    </div>
                )}
            </div>

            {/* Info — Épuré : Nom + Catégorie + Prix */}
            <div className="px-3 py-4">
                <h3 className="font-semibold text-gray-900 text-[15px] leading-snug mb-1 truncate">
                    {product.name}
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                    {product.category || 'Mobilier'}
                </p>
                <p className="font-semibold text-gray-900">
                    {product.price.toLocaleString()}{' '}
                    <span className="font-normal text-gray-400 text-sm">FCFA</span>
                </p>
            </div>
        </Link>
    );
}
