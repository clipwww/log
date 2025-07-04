import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  console.log('[mode]', mode)
  console.log('[isDev]', isDev)

  return {
    base: isDev ? '/' : 'https://cdn.jsdelivr.net/gh/clipwww/log@gh-pages/',
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      __PKG_NAME__: JSON.stringify(process.env.npm_package_name),
      __PKG_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    esbuild: isDev
      ? {}
      : {
        drop: ['debugger'],
        pure: ['console.log'],
      },
    // Vite 7.0 預設使用 'baseline-widely-available' 建構目標
    build: {
      target: 'baseline-widely-available',
    },
  }
})
