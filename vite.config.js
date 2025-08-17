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
        },
        // Optimize chunk loading
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Copy public files to build output
    copyPublicDir: true,
    // Performance optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true
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
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'styled-components'],
    exclude: ['chart.js', 'react-chartjs-2']
  },
  // CSS optimizations
  css: {
    devSourcemap: false
  }
})
