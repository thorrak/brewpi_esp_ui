import { defineStore } from 'pinia';
import { mande } from 'mande'
import { genCSRFOptions } from './CSRF';

export const useUpstreamSettingsStore = defineStore("UpstreamSettingsStore", {
    state: () => {
        return {
            hasUpstreamSettings: false,
            upstreamSettingsError: false,
            upstreamHost: "xxxxxx",  // TODO - Fix this
            upstreamPort: 0,
            deviceID: "ttttt",
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
        },
        async setUpstreamSettings(upstreamHost, upstreamPort, resetDeviceID) {
            try {
                const remote_api = mande("/api/upstream/", genCSRFOptions());
                const response = await remote_api.put({
                    upstreamHost: upstreamHost,  // String
                    upstreamPort: upstreamPort,  // String
                    resetDeviceID: resetDeviceID, // Boolean
                    // deviceID: deviceID,
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