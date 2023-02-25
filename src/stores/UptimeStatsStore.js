import { defineStore } from 'pinia';
import { mande } from 'mande'
import { genCSRFOptions } from './CSRF';

export const useUptimeStatsStore = defineStore("UptimeStatsStore", {
    state: () => {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            millis: 0,
            hasUptime: false,
            uptimeError: false,
        };
    },
    actions: {
        async getUptimeStats() {
            try {
                const remote_api = mande("/api/uptime/", genCSRFOptions());
                const response = await remote_api.get();
                if (response) {
                    this.days = response.days;
                    this.hours = response.hours;
                    this.minutes = response.minutes;
                    this.seconds = response.seconds;
                    this.millis = response.millis;
                    this.hasUptime = true;
                    this.uptimeError = false;

                } else {
                    await this.clearUptime();
                    this.uptimeError = true;
                }
            } catch (error) {
                await this.clearUptime();
                this.uptimeError = true;
            }
        },
        async clearUptime() {
            this.days = 0;
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
            this.millis = 0;
            this.hasUptime = false;
        }
    },
});