import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  css: {
    transformer: 'lightningcss',
  },
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
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
