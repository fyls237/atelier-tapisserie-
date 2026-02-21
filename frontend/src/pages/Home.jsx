import { Link } from 'react-router-dom';
import { ArrowRight, Star, Scissors, Palette, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../lib/constants';
import { testimonials } from '../lib/constants';

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Bonjour, j\'aimerais discuter d\'un projet avec vous.'
)}`;

export default function Home() {
    return (
        <div>
            {/* ═══════════════════════════════════════
                HERO — Plein écran avec image d'ambiance
            ═══════════════════════════════════════ */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
                {/* Background image with fallback */}
                <div
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900"
                    aria-hidden="true"
                />
                <img
                    src="/hero-home.png"
                    alt="Salon moderne africain"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <p className="text-amber-300 text-sm sm:text-base font-medium tracking-widest uppercase mb-4">
                        Artisanat d'exception à Yaoundé
                    </p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight mb-6">
                        Des meubles qui <br className="hidden sm:block" />
                        <span className="text-amber-300">racontent une histoire</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Création sur-mesure, rénovation et tapisserie d'art. Chaque pièce est pensée pour durer et embellir votre intérieur.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/catalogue"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base"
                        >
                            Découvrir le catalogue
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-base"
                        >
                            <MessageCircle className="mr-2 w-5 h-5" />
                            Nous contacter
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                SECTION — Nos valeurs
            ═══════════════════════════════════════ */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-4">
                            Pourquoi nous choisir ?
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto text-lg">
                            Un savoir-faire local, une exigence internationale.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Card 1 */}
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-100 transition-colors">
                                <Scissors size={28} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Artisanat Local</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Fait main à Yaoundé avec des bois locaux sélectionnés et des tissus de qualité supérieure.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-100 transition-colors">
                                <Palette size={28} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Design Sur-Mesure</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Chaque pièce est unique, conçue selon vos goûts, vos dimensions et votre intérieur.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-100 transition-colors">
                                <MessageCircle size={28} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Commande Facile</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Discutez directement avec nous sur WhatsApp pour créer votre projet en quelques échanges.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                SECTION — Témoignages Clients
            ═══════════════════════════════════════ */}
            <section className="py-20 md:py-28 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-4">
                            Ce que disent nos clients
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto text-lg">
                            La satisfaction de nos clients est notre meilleure publicité.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t) => (
                            <div
                                key={t.id}
                                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                            >
                                {/* Stars */}
                                <div
                                    className="flex gap-1 mb-4"
                                    role="img"
                                    aria-label={`Note : ${t.rating} étoiles sur 5`}
                                >
                                    {Array.from({ length: t.rating }).map((_, j) => (
                                        <Star
                                            key={j}
                                            size={18}
                                            className="fill-amber-400 text-amber-400"
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                                    "{t.text}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                                        <p className="text-gray-400 text-xs">{t.city}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                CTA — Bas de page
            ═══════════════════════════════════════ */}
            <section className="py-20 bg-white">
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
                        <Link
                            to="/services"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-all text-base"
                        >
                            Nos services
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
