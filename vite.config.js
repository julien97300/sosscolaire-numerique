import { defineConfig } from 'vite'
import path from 'path'

// Configuration optimisée
export default defineConfig({
  server: {
    open: true,
    hmr: {
      overlay: false,
      timeout: 30000
    },
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['gsap', 'chart.js', '@supabase/supabase-js'],
          utils: ['./js/utils/'],
          components: ['./js/components/']
        }
      }
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './js/components'),
      '@utils': path.resolve(__dirname, './js/utils')
    }
  },
  define: {
    'process.env': {}
  },
  envPrefix: ['VITE_']
})