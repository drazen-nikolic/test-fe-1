import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'
import { VitePWA } from 'vite-plugin-pwa'

// const apiUrl = process.env.VITE_APP_API_URL || 'http://localhost:5000/api'

export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin('all'),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      devOptions: {
        enabled: true
      },
      workbox: {
        runtimeCaching: [
          {
            // Cache images from the public folder
            urlPattern: /\/images\/.*\.(?:png|jpg|jpeg|gif|webp|svg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'public-images',
              expiration: {
                maxEntries: 100, // Limit number of cached images
                maxAgeSeconds: 60 * 60 * 24 * 30 // Cache for 30 days
              }
            }
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/products'),
            handler: 'NetworkFirst',
            options: {
              networkTimeoutSeconds: 10,
              cacheName: 'products-cache',
              expiration: {
                maxEntries: 20
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/categories'),
            handler: 'NetworkFirst',
            options: {
              networkTimeoutSeconds: 10,
              cacheName: 'categories-cache',
              expiration: {
                maxEntries: 5
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:js|css|html)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-assets',
              expiration: {
                maxEntries: 50
              }
            }
          }
        ]
      },
      manifest: {
        name: 'E-commerce catalog',
        short_name: 'EComCatalog',
        description: 'A React application',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
