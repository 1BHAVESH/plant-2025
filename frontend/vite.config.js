import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://trefle.io/api/v1',  // Trefle API URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // /api ko hata kar direct API endpoint use karenge
      },
    },
  },
})
