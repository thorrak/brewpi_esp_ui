import { defineStore } from 'pinia';
import { mande } from 'mande'
import { genCSRFOptions } from './CSRF';

export const useLCDStore = defineStore("LCDStore", {
    state: () => {
        return {
            LCDTextLines: [],
        };
    },
    actions: {
        async getLCD() {
            const remote_api = mande("/api/lcd/", genCSRFOptions());
            const response = await remote_api.get();
            if (response && Array.isArray(response)) {
                this.LCDTextLines = response;
            } else {
                await this.populateDefaultLCD();
            }
        },
        async populateDefaultLCD() {
            this.LCDTextLines = [
                "Unable to retrieve",
                "LCD text from device",
                "Check power/internet",
                "connection.",
            ];
        }
    },
});