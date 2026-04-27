import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/DNNAPP/'   // ← agrega esta línea con tu nombre de repo exacto
})