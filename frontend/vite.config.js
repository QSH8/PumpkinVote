import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      // ['^' + process.env.VUE_APP_API_URL]: {
      //   target: process.env.API_HOST + ':' + process.env.API_PORT + '/',
      //   ws: true,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ['^' + process.env.VUE_APP_API_URL]: process.env.VUE_APP_API_URL,
      //   },
      // },
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Проксируем запрос к:', req.url);
          });
        }
      }
    }
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api/index.js', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services/index.js', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils/index.js', import.meta.url)),
    },
  },
})
