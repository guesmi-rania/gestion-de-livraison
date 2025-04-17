// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // ✅ très important pour GitHub Pages
  plugins: [react()],
  build: {
    outDir: 'dist', // par défaut, mais à confirmer
  },
});
