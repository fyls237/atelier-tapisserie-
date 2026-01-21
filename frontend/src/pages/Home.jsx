import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-amber-900 text-white">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                {/* Image de fond placeholder ou une belle texture bois */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">
                        L'Art du Bois & de la Tapisserie <br /> à Yaoundé
                    </h1>
                    <p className="text-lg md:text-xl text-amber-100 max-w-2xl mb-8">
                        Nous transformons vos espaces avec des meubles sur-mesure, alliant tradition artisanale et design moderne. Rénovation, création, et passion.
                    </p>
                    <Link
                        to="/catalogue"
                        className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-amber-900 bg-amber-50 hover:bg-white md:text-lg transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Voir le Catalogue
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Values / Presentation Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Pourquoi nous choisir ?</h2>
                        <div className="w-24 h-1 bg-amber-600 mx-auto rounded"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-gray-50 rounded-lg text-center">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                            <h3 className="text-xl font-semibold mb-2">Artisanat Local</h3>
                            <p className="text-gray-600">Fait main à Yaoundé avec des bois locaux de qualité supérieure.</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-lg text-center">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                            <h3 className="text-xl font-semibold mb-2">Design Sur-Mesure</h3>
                            <p className="text-gray-600">Chaque pièce est unique et adaptée à vos goûts et à votre intérieur.</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-lg text-center">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                            <h3 className="text-xl font-semibold mb-2">Commande Facile</h3>
                            <p className="text-gray-600">Discutez directement avec nous sur WhatsApp pour commander.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
