// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    //...
  ],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  vuetify: {
    theme: {
      themes: {
        dark: {
          primary: '#ff5722', // استخدام لون مميز يتناسب مع تصميم رياضي
          secondary: '#4caf50', // لون ثانوي
          accent: '#ffc107', // أكسنت يليق بالرياضة
          background: '#121212', // خلفية داكنة
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      STORAGE_URL: process.env.STORAGE_URL,
    },
  },
})
