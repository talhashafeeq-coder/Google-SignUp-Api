import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   // Proxy options
    //   '/api': {
    //     target: 'http://localhost:3000', // Target URL for all API requests
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '/api') // Rewrite '/api' to '/api'
    //   },
    // }
  }
})
// export default {
  
// }
