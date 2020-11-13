import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

import '@/assets/css/tailwind.css'
import '@/assets/scss/index.scss'

createApp(App).mount("#app");
