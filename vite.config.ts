import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This ensures process.env is available in the browser for the Gemini SDK.
    // Use process.env directly from the Node environment during build time to fix the TS error.
    'process.env': process.env
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          utils: ['lucide-react', 'recharts']
        }
      }
    }
  }
});
