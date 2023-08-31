import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const isDev = mode === 'development'
  console.log('[mode]', mode)
  console.log('[isDev]', isDev)

  return defineConfig({
    base: isDev ? '/' : 'https://cdn.jsdelivr.net/gh/clipwww/log@gh-pages/',
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      __PKG_NAME__: JSON.stringify(process.env.npm_package_name),
      __PKG_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    esbuild: isDev ? {} : {
      drop: ['debugger'],
      pure: ['console.log'],
    },
  })
}