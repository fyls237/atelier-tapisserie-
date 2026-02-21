import { Link } from 'react-router-dom';
import {
    Sofa,
    BedDouble,
    UtensilsCrossed,
    Recycle,
    PackageCheck,
    MapPin,
    Truck,
    MessageCircle,
    Sparkles,
    HeartHandshake,
    ArrowRight,
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '../lib/constants';

const services = [
    {
        id: 'creation-sur-mesure',
        icon: Sofa,
        emoji: '🛋️',
        title: 'Création Sur-Mesure',
        subtitle: 'Salons & Canapés',
        description:
            'Du design à la finition, nous confectionnons des salons modernes et confortables qui reflètent votre style. Un travail de tapisserie minutieux pour un rendu haut de gamme.',
    },
    {
        id: 'lits-espaces-nuit',
        icon: BedDouble,
        emoji: '🛏️',
        title: 'Lits & Espaces Nuit',
        subtitle: null,
        description:
            'Confection de lits design, têtes de lit capitonnées et sommiers robustes. Nous allions l\'esthétique au confort pour transformer votre chambre en un véritable palace.',
    },
    {
        id: 'salles-a-manger',
        icon: UtensilsCrossed,
        emoji: '🍽️',
        title: 'Salles à Manger',
        subtitle: null,
        description:
            'Des ensembles de chaises et tables élégants pour faire de vos repas de véritables moments de convivialité, avec des finitions en bois massif et des assises durables.',
    },
    {
        id: 'refection-seconde-vie',
        icon: Recycle,
        emoji: '♻️',
        title: 'Réfection & Seconde Vie',
        subtitle: null,
        description:
            'Ne jetez plus ! Nos maîtres tapissiers redonnent vie à vos anciens meubles. Changement de tissu, rembourrage de mousse et restauration de la structure pour un résultat comme neuf.',
    },
    {
        id: 'vente-gros-b2b',
        icon: PackageCheck,
        emoji: '📦',
        title: 'Vente en Gros & B2B',
        subtitle: null,
        description:
            'Vous êtes un professionnel ou un revendeur ? Nous avons la capacité de produire en série avec des tarifs préférentiels, tout en maintenant notre standard de qualité constant.',
    },
];

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Bonjour, j\'aimerais discuter d\'un projet avec vous.'
)}`;

export default function Services() {
    return (
        <div className="bg-white">
            {/* ══════════════════════════════════════════════
                SECTION HERO — L'esprit de l'entreprise
            ══════════════════════════════════════════════ */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                        <Sparkles size={16} className="text-amber-500" />
                        Excellence & Savoir-Faire
                        <Sparkles size={16} className="text-amber-500" />
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 leading-tight text-gray-900">
                        Notre Savoir-Faire,{' '}
                        <span className="text-amber-600">Votre Satisfaction</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Inspirés par l'excellence, nous concevons bien plus que des meubles&nbsp;:
                        nous créons des <strong className="text-gray-900">espaces de vie</strong>.
                        Notre engagement&nbsp;? Un standard de qualité irréprochable et un client
                        toujours satisfait au centre de nos processus.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/catalogue"
                            className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-base"
                        >
                            Voir le Catalogue
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-all text-base"
                        >
                            <MessageCircle className="mr-2 w-5 h-5" />
                            Nous Contacter
                        </a>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION NOS SERVICES — Grille de cartes
            ══════════════════════════════════════════════ */}
            <section className="py-20 md:py-28 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section heading */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-4">
                            Nos Services
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            De la création sur-mesure à la rénovation, découvrez comment nous
                            pouvons transformer votre intérieur.
                        </p>
                    </div>

                    {/* Cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={service.id}
                                    className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* Icon badge */}
                                    <div className="w-14 h-14 bg-gray-100 text-gray-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-50 group-hover:text-amber-700 transition-colors duration-300">
                                        <Icon size={28} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-1 font-serif">
                                        {service.emoji} {service.title}
                                    </h3>
                                    {service.subtitle && (
                                        <p className="text-amber-600 text-sm font-semibold mb-3">
                                            {service.subtitle}
                                        </p>
                                    )}

                                    {/* Description */}
                                    <p className="text-gray-500 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION INFORMATIONS PRATIQUES & LOGISTIQUE
            ══════════════════════════════════════════════ */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section heading */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-4">
                            Proximité & Service Clé en Main{' '}
                            <HeartHandshake className="inline w-8 h-8 text-amber-600" />
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto text-lg">
                            Un accompagnement de A à Z, depuis notre atelier jusqu'à chez vous.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Location card */}
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex items-start gap-5 hover:shadow-sm transition">
                            <div className="flex-shrink-0 w-12 h-12 bg-white text-gray-700 rounded-xl flex items-center justify-center shadow-sm">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">
                                    📍 Notre Atelier
                                </h3>
                                <p className="text-gray-500 leading-relaxed">
                                    Retrouvez notre atelier principal à{' '}
                                    <strong className="text-gray-900">
                                        Yaoundé, Camp Sonel Oyom Abang
                                    </strong>
                                    . Venez découvrir notre espace de production et discuter de
                                    votre projet en personne&nbsp;!
                                </p>
                            </div>
                        </div>

                        {/* Delivery card */}
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex items-start gap-5 hover:shadow-sm transition">
                            <div className="flex-shrink-0 w-12 h-12 bg-white text-gray-700 rounded-xl flex items-center justify-center shadow-sm">
                                <Truck size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">
                                    🚚 Livraison à Domicile
                                </h3>
                                <p className="text-gray-500 leading-relaxed">
                                    Service de livraison à domicile disponible. Frais sur devis en
                                    fonction de votre localisation. Nous nous occupons de tout,
                                    jusqu'à l'installation chez vous.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION CALL TO ACTION
            ══════════════════════════════════════════════ */}
            <section className="py-20 md:py-24 bg-gray-50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-6 leading-tight">
                        Un projet en tête ou un meuble à rénover&nbsp;?
                    </h2>
                    <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
                        Parlons de votre idée&nbsp;! Décrivez-nous votre projet et recevez un devis
                        personnalisé sans engagement.
                    </p>

                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-green-500 text-white text-lg font-semibold rounded-full hover:bg-green-600 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <MessageCircle size={24} />
                        Discutons-en sur WhatsApp 💬
                    </a>
                </div>
            </section>
        </div>
    );
}
