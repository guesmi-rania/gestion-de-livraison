// delivery-manager/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/gestion-de-livraison/',  // Assurez-vous que cette ligne est correcte pour votre déploiement
});