import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy '/cars' API requests to the backend server
      '/api': {
        target: 'http://3.104.75.209:4002',
        changeOrigin: true,
        secure: false, // Disable SSL certificate checking (useful in development)
      }
    }
  }
})
