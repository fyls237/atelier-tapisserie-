import { useState, useEffect } from 'react';
import api from '../../lib/axios';

export default function Finance() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]); // Pour le select vente

    // États Formulaires
    const [showSaleForm, setShowSaleForm] = useState(false);
    const [showExpenseForm, setShowExpenseForm] = useState(false);

    // Données Formulaires
    const [saleData, setSaleData] = useState({ product_id: '', quantity: 1, total_amount: '', description: '' });
    const [expenseData, setExpenseData] = useState({ title: '', amount: '', category: 'Matière première' });

    const fetchStats = async () => {
        try {
            const [statsRes, prodRes] = await Promise.all([
                api.get('/finance/stats/'),
                api.get('/products/')
            ]);
            setStats(statsRes.data);
            setProducts(prodRes.data);
        } catch (error) {
            console.error("Erreur chargement finance", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleCreateSale = async (e) => {
        e.preventDefault();
        try {
            await api.post('/finance/sales/', {
                product_id: saleData.product_id || null, // Optional
                quantity: parseInt(saleData.quantity),
                total_amount: parseFloat(saleData.total_amount),
                description: saleData.description
            });
            setShowSaleForm(false);
            setSaleData({ product_id: '', quantity: 1, total_amount: '', description: '' });
            fetchStats();
        } catch (error) {
            alert("Erreur création vente");
        }
    };

    const handleCreateExpense = async (e) => {
        e.preventDefault();
        try {
            await api.post('/finance/expenses/', {
                description: expenseData.title,
                amount: parseFloat(expenseData.amount),
                category: expenseData.category
            });
            setShowExpenseForm(false);
            setExpenseData({ title: '', amount: '', category: 'Matière première' });
            fetchStats();
        } catch (error) {
            alert("Erreur création dépense");
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-mono">Chargement des comptes...</div>;

    return (
        <div className="space-y-6">
            {/* KPIS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                    <h3 className="text-sm font-medium text-gray-500 uppercase">Recettes Totales</h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{stats?.total_revenue?.toLocaleString()} <span className="text-sm text-gray-400">FCFA</span></p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                    <h3 className="text-sm font-medium text-gray-500 uppercase">Dépenses Totales</h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{stats?.total_expenses?.toLocaleString()} <span className="text-sm text-gray-400">FCFA</span></p>
                </div>
                <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${stats?.balance >= 0 ? 'border-blue-500' : 'border-red-600'}`}>
                    <h3 className="text-sm font-medium text-gray-500 uppercase">Solde Trésorerie</h3>
                    <p className={`mt-2 text-3xl font-bold ${stats?.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {stats?.balance?.toLocaleString()} <span className="text-sm text-gray-400">FCFA</span>
                    </p>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="flex space-x-4">
                <button onClick={() => setShowSaleForm(true)} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium shadow-sm">
                    + Nouvelle Vente
                </button>
                <button onClick={() => setShowExpenseForm(true)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium shadow-sm">
                    - Nouvelle Dépense
                </button>
            </div>

            {/* HISTORIQUE */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">10 Dernières Transactions</h3>
                </div>
                <ul className="divide-y divide-gray-200">
                    {stats?.recent_transactions?.map((t, idx) => (
                        <li key={`${t.type}-${t.id}-${idx}`} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{t.description}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(t.date).toLocaleDateString()} • {t.category}
                                </p>
                            </div>
                            <span className={`text-base font-bold ${t.type === 'sale' ? 'text-green-600' : 'text-red-600'}`}>
                                {t.type === 'sale' ? '+' : '-'}{t.amount.toLocaleString()} FCFA
                            </span>
                        </li>
                    ))}
                    {stats?.recent_transactions?.length === 0 && (
                        <li className="px-6 py-8 text-center text-gray-500">Aucune transaction enregistrée.</li>
                    )}
                </ul>
            </div>

            {/* MODAL VENTE */}
            {showSaleForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <form onSubmit={handleCreateSale} className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md space-y-4">
                        <h3 className="text-lg font-bold">Enregistrer une Vente</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Produit (Optionnel)</label>
                            <select
                                value={saleData.product_id}
                                onChange={e => setSaleData({ ...saleData, product_id: e.target.value })}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                            >
                                <option value="">Sélectionner un produit...</option>
                                {products.map(p => <option key={p.id} value={p.id}>{p.name} ({p.stock})</option>)}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Quantité</label>
                                <input type="number" min="1" required
                                    value={saleData.quantity} onChange={e => setSaleData({ ...saleData, quantity: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Montant Total</label>
                                <input type="number" required
                                    value={saleData.total_amount} onChange={e => setSaleData({ ...saleData, total_amount: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Notes / Client</label>
                            <input type="text"
                                value={saleData.description} onChange={e => setSaleData({ ...saleData, description: e.target.value })}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                placeholder="Ex: Commande Mme. X"
                            />
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button type="button" onClick={() => setShowSaleForm(false)} className="px-4 py-2 border rounded text-gray-600">Annuler</button>
                            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Valider</button>
                        </div>
                    </form>
                </div>
            )}

            {/* MODAL DEPENSE */}
            {showExpenseForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <form onSubmit={handleCreateExpense} className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md space-y-4">
                        <h3 className="text-lg font-bold">Enregistrer une Dépense</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Titre</label>
                            <input type="text" required
                                value={expenseData.title} onChange={e => setExpenseData({ ...expenseData, title: e.target.value })}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                placeholder="Ex: Achat bois"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Montant</label>
                                <input type="number" required
                                    value={expenseData.amount} onChange={e => setExpenseData({ ...expenseData, amount: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                                <select required
                                    value={expenseData.category} onChange={e => setExpenseData({ ...expenseData, category: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                >
                                    <option>Matière première</option>
                                    <option>Transport</option>
                                    <option>Salaire</option>
                                    <option>Charges</option>
                                    <option>Autre</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button type="button" onClick={() => setShowExpenseForm(false)} className="px-4 py-2 border rounded text-gray-600">Annuler</button>
                            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Valider</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
