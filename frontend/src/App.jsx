import { useState, useEffect } from 'react'
import api from './lib/axios'

function App() {
    const [message, setMessage] = useState('Chargement...')

    useEffect(() => {
        // Test de connexion au backend
        api.get('/')
            .then(res => setMessage(res.data.message))
            .catch(err => setMessage('Erreur de connexion au Backend'))
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold text-blue-600 mb-4">Atelier Tapisserie</h1>
                <p className="text-gray-700 mb-4">
                    Statut Backend : <span className="font-mono font-semibold">{message}</span>
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Bouton Tailwind Test
                </button>
            </div>
        </div>
    )
}

export default App
