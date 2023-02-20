import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { LoadingPlugin } from 'vue-loading-overlay';
import router from './router'
import App from './App.vue'
import './style.css'
import 'vue-loading-overlay/dist/css/index.css';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(LoadingPlugin);
app.use(router);
app.mount('#app');

