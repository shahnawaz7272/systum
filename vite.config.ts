import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'Ludobg.png'],
      manifest: {
        name: 'Ludo PWA',
        short_name: 'Ludo',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ff0000',
        icons: [
          {
            src: 'icons/Ludo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/Ludo512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})