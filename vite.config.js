import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy '/api' API requests to the backend server during development
      '/api': {
        target: 'http://3.104.75.209:4002', // Backend server address
        changeOrigin: true,
        secure: false, // Disable SSL certificate checking in development
      },
    },
  },
});
