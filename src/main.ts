import { createApp } from "vue";
import '@vant/touch-emulator';

import App from "./App.vue";

import "./registerServiceWorker";
import 'vant/lib/index.css';
import '@/assets/css/tailwind.css'
import '@/assets/scss/index.scss'
import router from './router'
import { initVueGtag } from '@/plugins/vue-gtag'

const app = createApp(App)

initVueGtag(app)

app.use(router)
  .mount("#app");
