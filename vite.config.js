import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                loans: resolve(__dirname, 'loans/index.html'),
                ramps: resolve(__dirname, 'ramps/index.html'),
                rampsBlog: resolve(__dirname, 'ramps/blog/index.html'),
                d3po: resolve(__dirname, 'd3po/index.html'),
                autospec: resolve(__dirname, 'autospec/index.html'),
            },
        },
    },
})
