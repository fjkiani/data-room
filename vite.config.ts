import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@site': path.resolve(__dirname, 'src/components/site'),
      '@slides': path.resolve(__dirname, 'src/components/deck/slides'),
      '@data': path.resolve(__dirname, 'src/data'),
    }
  }
})
