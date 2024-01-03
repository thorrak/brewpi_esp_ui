import { defineStore } from 'pinia';
import { mande } from 'mande'
import { genCSRFOptions } from './CSRF';
import { ref } from 'vue';

export const useUpstreamSettingsStore = defineStore("UpstreamSettingsStore", () => {
    const hasUpstreamSettings = ref(false);
    const upstreamSettingsError = ref(false);
    const upstreamHost = ref("");
    const upstreamPort = ref(0);
    const username = ref("");
    const apiKey = ref("");
    const upstreamRegistrationError = ref(7);
    const deviceID = ref("");

    async function getUpstreamSettings() {
        try {
            const remote_api = mande("/api/upstream/", genCSRFOptions());
            const response = await remote_api.get();
            if (response) {
                hasUpstreamSettings.value = true;
                upstreamSettingsError.value = false;
                upstreamHost.value = response.upstreamHost;
                upstreamPort.value = response.upstreamPort;
                deviceID.value = response.deviceID;
                username.value = response.username;
                apiKey.value = response.apiKey;
                upstreamRegistrationError.value = response.upstreamRegistrationError;

            } else {
                await clearUpstreamSettings();
                upstreamSettingsError.value = true;
            }
        } catch (error) {
            await clearUpstreamSettings();
            upstreamSettingsError.value = true;
        }
    }

    async function clearUpstreamSettings() {
        hasUpstreamSettings.value = false;
        upstreamHost.value = "";
        upstreamPort.value = 0;
        deviceID.value = "";
        username.value = "";
        apiKey.value = "";
        upstreamRegistrationError.value = 7;
    }

    async function setUpstreamSettings(upstreamHostParam, upstreamPortParam, usernameParam, apiKeyParam) {
        try {
            const remote_api = mande("/api/upstream/", genCSRFOptions());
            const response = await remote_api.put({
                upstreamHost: upstreamHostParam,  // String
                upstreamPort: Number(upstreamPortParam),  // Integer
                username: usernameParam, // String
                // apiKey: apiKeyParam, // String
                // deviceID: deviceID, // Not processed in the firmware currently
            });
            if (response && response.message) {
                // TODO - Make sure the response is successful
                // TODO - Test once we add a check to make sure the response is successful

                // On success, update the store
                this.hasUpstreamSettings = true;
                this.upstreamHost = upstreamHostParam;
                this.upstreamPort = Number(upstreamPortParam);
                this.username = usernameParam;
                this.apiKey = apiKeyParam;
            } else {
                await clearUpstreamSettings();
                upstreamSettingsError.value = true;
            }
        } catch (error) {
            await clearUpstreamSettings();
            upstreamSettingsError.value = true;
        }
    }

    return { hasUpstreamSettings, upstreamSettingsError, upstreamHost, upstreamPort, username, apiKey, upstreamRegistrationError, deviceID, getUpstreamSettings, clearUpstreamSettings, setUpstreamSettings };
});
