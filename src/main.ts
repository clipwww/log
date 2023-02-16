import { createApp } from "vue";
import '@vant/touch-emulator';

import App from "./App.vue";

import "./registerServiceWorker";
import 'vant/lib/index.css';
import '@/assets/css/tailwind.css'
import '@/assets/scss/index.scss'
import router from './router'

createApp(App)
  .use(router)
  .mount("#app");
