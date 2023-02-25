import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "@/components/Dashboard.vue";
import UpstreamSettings from "@/components/UpstreamSettings.vue";
import ConfigSensorsActuators from "@/components/ConfigSensorsActuators.vue";
import About from "@/components/About.vue";

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
    {
        path: "/devices",
        name: "ConfigSensorsActuators",
        component: ConfigSensorsActuators,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;