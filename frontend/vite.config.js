import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: true, // Écoute sur 0.0.0.0 pour Docker
        port: 5173,
        watch: {
            usePolling: true,
        },
        proxy: {
            '/api': {
                target: 'http://backend:8000', // Via le réseau Docker
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
            '/static': {
                target: 'http://backend:8000',
                changeOrigin: true,
            }
        }
    }
})
