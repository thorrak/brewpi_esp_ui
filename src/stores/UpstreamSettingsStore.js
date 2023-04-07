import { defineStore } from 'pinia';
import { mande } from 'mande'
import { genCSRFOptions } from './CSRF';

export const useUpstreamSettingsStore = defineStore("UpstreamSettingsStore", {
    state: () => {
        return {
            hasUpstreamSettings: false,
            upstreamSettingsError: false,
            upstreamHost: "",
            upstreamPort: 0,
            username: "",  // Generally will not be stored beyond registration
            apiKey: "",
            upstreamRegistrationError: 7,
            deviceID: "",
        };
    },
    actions: {
        async getUpstreamSettings() {
            try {
                const remote_api = mande("/api/upstream/", genCSRFOptions());
                const response = await remote_api.get();
                if (response) {
                    this.hasUpstreamSettings = true;
                    this.upstreamSettingsError = false;
                    this.upstreamHost = response.upstreamHost;
                    this.upstreamPort = response.upstreamPort;
                    this.deviceID = response.deviceID;
                    this.username = response.username;
                    this.apiKey = response.apiKey;
                    this.upstreamRegistrationError = response.upstreamRegistrationError;

                } else {
                    await this.clearUpstreamSettings();
                    this.upstreamSettingsError = true;
                }
            } catch (error) {
                await this.clearUpstreamSettings();
                this.upstreamSettingsError = true;
            }
        },
        async clearUpstreamSettings() {
            this.hasUpstreamSettings = false;
            this.upstreamHost = "";
            this.upstreamPort = 0;
            this.deviceID = "";
            this.username = "";
            this.apiKey = "";
            this.upstreamRegistrationError = 7;
        },
        async setUpstreamSettings(upstreamHost, upstreamPort, resetDeviceID, username, apiKey) {
            try {
                const remote_api = mande("/api/upstream/", genCSRFOptions());
                const response = await remote_api.put({
                    upstreamHost: upstreamHost,  // String
                    upstreamPort: Number(upstreamPort),  // Integer
                    resetDeviceID: resetDeviceID, // Boolean
                    username: username, // String
                    apiKey: apiKey, // String
                    // deviceID: deviceID, // Not processed in the firmware currently
                });
                if (response && response.message) {
                    // TODO - Check response.message
                    await this.getUpstreamSettings()
                } else {
                    await this.clearUpstreamSettings();
                    this.upstreamSettingsError = true;
                }
            } catch (error) {
                await this.clearUpstreamSettings();
                this.upstreamSettingsError = true;
            }
        }
    },
});