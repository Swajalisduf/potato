import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "bootstrap/scss/_functions.scss";
          @import "bootstrap/scss/_variables.scss";
          @import "bootstrap/scss/_mixins.scss";
        `
      }
    }
  },
  resolve:{
    alias:{
      '~' : path.resolve(__dirname, './src')
    },
  },
  plugins: [vue()]
})
