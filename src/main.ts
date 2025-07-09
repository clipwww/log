import { createApp } from 'vue'

import { initVueGtag } from '@/plugins/vue-gtag'

import App from './App.vue'
import router from './router'
import '@vant/touch-emulator'
// import './registerServiceWorker'
import 'vant/lib/index.css'

import '@/assets/css/tailwind.css'
import '@/assets/scss/index.scss'

const app = createApp(App)

initVueGtag(app)

app.use(router)
  .mount('#app')
