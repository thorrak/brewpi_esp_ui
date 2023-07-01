import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { LoadingPlugin } from 'vue-loading-overlay';
import router from './router'
import App from './App.vue'
import './style.css'
import 'vue-loading-overlay/dist/css/index.css';

// import translations
import es from "./locales/es.json";
import en from "./locales/en.json";


function getBrowserLocales(options = {}) {
    const defaultOptions = {
        languageCodeOnly: false,
    };

    const opt = {
        ...defaultOptions,
        ...options,
    };

    const browserLocales =
        navigator.languages === undefined
            ? [navigator.language]
            : navigator.languages;

    if (!browserLocales) {
        return undefined;
    }

    return browserLocales.map(locale => {
        const trimmedLocale = locale.trim();
        return opt.languageCodeOnly
            ? trimmedLocale.split(/-|_/)[0]
            : trimmedLocale;
    });
}

// configure i18n
import { createI18n } from "vue-i18n";
// console.log("getBrowserLocales: ", getBrowserLocales({ languageCodeOnly: true })[0]);
export const i18n = createI18n({
    // legacy: false,
    locale: getBrowserLocales({ languageCodeOnly: true })[0] || "en",
    fallbackLocale: "en",
    messages: { es, en },
});


const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(i18n);
app.use(LoadingPlugin);
app.use(router);
app.mount('#app');

