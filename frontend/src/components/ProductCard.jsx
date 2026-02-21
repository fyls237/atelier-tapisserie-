import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../lib/constants';

export default function ProductCard({ product }) {
    const message = encodeURIComponent(`Bonjour, je suis intéressé par le produit : ${product.name}`);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
            <div className="relative aspect-square overflow-hidden bg-gray-200">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Pas d'image
                    </div>
                )}
                {/* Stock badge */}
                <div className="absolute top-2 right-2">
                    {product.stock > 0 ? (
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">En stock</span>
                    ) : (
                        <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">Épuisé</span>
                    )}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-xs text-amber-600 font-semibold uppercase tracking-wider">{product.category || 'Mobilier'}</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1 leading-tight">{product.name}</h3>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xl font-bold text-gray-900">
                        {product.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">FCFA</span>
                    </span>

                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-full hover:bg-green-600 transition shadow-sm hover:shadow"
                    >
                        <MessageCircle size={18} className="mr-2" />
                        Commander
                    </a>
                </div>
            </div>
        </div>
    );
}
