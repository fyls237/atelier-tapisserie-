import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MessageCircle, CheckCircle, XCircle } from 'lucide-react';
import api from '../lib/axios';
import { WHATSAPP_NUMBER } from '../lib/constants';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error('Erreur chargement produit', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Produit introuvable</h2>
                <p className="text-gray-500 mb-8">Ce produit n'existe pas ou a été retiré du catalogue.</p>
                <Link
                    to="/catalogue"
                    className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition font-medium"
                >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Retour au catalogue
                </Link>
            </div>
        );
    }

    const message = encodeURIComponent(
        `Bonjour, je suis intéressé par le produit : ${product.name} (réf. #${product.id})`
    );
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    const inStock = product.stock > 0;

    return (
        <div className="bg-white min-h-screen">
            {/* Back nav — très discret */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
                <Link
                    to="/catalogue"
                    className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-gray-900 transition"
                >
                    <ArrowLeft className="mr-1.5 w-3.5 h-3.5" />
                    Catalogue
                </Link>
            </div>

            {/* ═══════════════════════════════════════
                LAYOUT PRINCIPAL — 2 colonnes desktop
            ═══════════════════════════════════════ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-16">
                <div className="lg:grid lg:grid-cols-5 lg:gap-12 items-start">

                    {/* ── GAUCHE — Image + Description (3/5) ── */}
                    <div className="lg:col-span-3 mb-8 lg:mb-0">
                        {/* Image principale */}
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-8">
                            {product.image_url ? (
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    loading="eager"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-300">
                                    Pas d'image disponible
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="border-t border-gray-100 pt-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-[15px]">
                                {product.description || 'Aucune description disponible pour ce produit.'}
                            </p>
                        </div>

                        {/* Détails supplémentaires */}
                        <div className="border-t border-gray-100 pt-8 mt-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Détails</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-xl px-4 py-3">
                                    <p className="text-xs text-gray-400 mb-1">Catégorie</p>
                                    <p className="font-medium text-gray-900">{product.category || 'Mobilier'}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl px-4 py-3">
                                    <p className="text-xs text-gray-400 mb-1">Disponibilité</p>
                                    <p className="font-medium text-gray-900">
                                        {inStock ? `${product.stock} en stock` : 'Sur commande'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── DROITE — Card sticky (2/5) ── */}
                    <div className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
                            <p className="text-sm text-gray-400 mb-1">{product.category || 'Mobilier'}</p>
                            <h1 className="text-2xl font-bold text-gray-900 font-serif mb-4">{product.name}</h1>

                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-3xl font-bold text-gray-900">
                                    {product.price.toLocaleString()}
                                </span>
                                <span className="text-gray-400 text-lg">FCFA</span>
                            </div>

                            <div className="border-t border-gray-100 mb-6"></div>

                            <div className="flex items-center gap-2 mb-6" role="status" aria-label={inStock ? `En stock, ${product.stock} disponibles` : 'Sur commande'}>
                                {inStock ? (
                                    <>
                                        <CheckCircle size={18} className="text-green-500" aria-hidden="true" />
                                        <span className="text-sm text-green-700 font-medium">
                                            En stock — {product.stock} disponible{product.stock > 1 ? 's' : ''}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle size={18} className="text-amber-500" aria-hidden="true" />
                                        <span className="text-sm text-amber-700 font-medium">
                                            Sur commande — Contactez-nous
                                        </span>
                                    </>
                                )}
                            </div>

                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full px-6 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all shadow-sm hover:shadow-md text-base"
                            >
                                <MessageCircle className="mr-2 w-5 h-5" />
                                Commander sur WhatsApp
                            </a>

                            <p className="text-xs text-gray-400 text-center mt-4">
                                Réponse rapide · Devis gratuit
                            </p>
                        </div>
                    </div>

                    {/* ── MOBILE — Titre + prix ── */}
                    <div className="lg:hidden mb-8">
                        <p className="text-sm text-gray-400 mb-1">{product.category || 'Mobilier'}</p>
                        <h1 className="text-2xl font-bold text-gray-900 font-serif mb-3">{product.name}</h1>
                        <div className="flex items-center gap-2 mb-3" role="status" aria-label={inStock ? 'En stock' : 'Sur commande'}>
                            {inStock ? (
                                <>
                                    <CheckCircle size={16} className="text-green-500" aria-hidden="true" />
                                    <span className="text-sm text-green-700 font-medium">En stock</span>
                                </>
                            ) : (
                                <>
                                    <XCircle size={16} className="text-amber-500" aria-hidden="true" />
                                    <span className="text-sm text-amber-700 font-medium">Sur commande</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════
                CTA — Bas de page (avant le footer)
            ═══════════════════════════════════════ */}
            <section className="py-20 bg-gray-50 mb-20 lg:mb-0">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Prêt à transformer votre intérieur ?
                    </h2>
                    <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
                        Parcourez notre catalogue ou contactez-nous directement pour un devis gratuit.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/catalogue"
                            className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all shadow-md text-base"
                        >
                            Voir le catalogue
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-all text-base"
                        >
                            <MessageCircle className="mr-2 w-5 h-5" />
                            Nous contacter
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                MOBILE — CTA sticky en bas
            ═══════════════════════════════════════ */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-50">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xl font-bold text-gray-900">
                            {product.price.toLocaleString()}{' '}
                            <span className="text-sm font-normal text-gray-400">FCFA</span>
                        </p>
                    </div>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition shadow-sm text-sm"
                    >
                        <MessageCircle className="mr-2 w-4 h-4" />
                        Commander
                    </a>
                </div>
            </div>
        </div>
    );
}
