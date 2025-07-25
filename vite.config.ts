import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import { imageOptimizer } from './vite-plugin-image-optimizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin(), imageOptimizer()],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: {
        chrome: 95,
        firefox: 95,
        safari: 14,
        edge: 95
      },
      drafts: {
        customMedia: true
      }
    },
  },
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
    cssMinify: 'lightningcss',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react'],
          'react-dom': ['react-dom'],
        },
      },
    },
  },
  ssr: {
    target: 'node',
    external: ['react', 'react-dom'],
  },
  server: {
    fs: {
      strict: true,
      allow: ['..'],
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
})
