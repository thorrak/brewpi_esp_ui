import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "@/components/Dashboard.vue";

// NOTE - The below paths MUST also be set up in the relevant firmware!
const routes = [
    {
        path: "/",
        name: "Home",
        component: Dashboard,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;