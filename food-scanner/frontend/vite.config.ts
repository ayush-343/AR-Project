import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '192.168.1.5+1-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '192.168.1.5+1.pem')),
    },
  }
})
