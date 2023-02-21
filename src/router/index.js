import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "@/components/Dashboard.vue";
import UpstreamSettings from "@/components/UpstreamSettings.vue";

// NOTE - The below paths MUST also be set up in the relevant firmware!
const routes = [
    {
        path: "/",
        name: "Home",
        component: Dashboard,
    },
    {
        path: "/upstream",
        name: "UpstreamSettings",
        component: UpstreamSettings,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;