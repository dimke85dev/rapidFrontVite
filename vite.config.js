import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh';
import {  esbuildCommonjs } from '@originjs/vite-plugin-commonjs';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),reactRefresh()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(['react-moment'])],
    },
  },
})
