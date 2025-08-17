import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Ensure proper build output
    outDir: 'dist',
    // Source maps for debugging
    sourcemap: false,
    // Optimize dependencies
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['chart.js', 'react-chartjs-2'],
          styled: ['styled-components']
        }
      }
    },
    // Copy public files to build output
    copyPublicDir: true
  },
  // Ensure public directory is properly served
  publicDir: 'public',
  // Server configuration for development
  server: {
    port: 3000,
    open: true
  },
  // Resolve aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
