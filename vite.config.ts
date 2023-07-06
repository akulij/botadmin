import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // tsConfigPaths(),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                statistics: resolve(__dirname, 'statistics/index.html'),
                chats: resolve(__dirname, 'chats/index.html'),
            }
        }
    },
    resolve: {
        alias: [
            { find: '@src', replacement: resolve(__dirname, 'src') },
        ]
    }
})
