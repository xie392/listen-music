import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import config from './src/utils/config';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: config.Port,
    host: '0.0.0.0',
    // open: true,
    // proxy: {
    //   key: {
    //     target:`http://192.168.2.7:${port}`,
    //     changeOrigin: true,
    //     // rewrite: (path) => path.replace(/^\/key/, ''),
    //   },
    // },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': {}
  }
})
