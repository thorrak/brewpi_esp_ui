import { defineStore } from 'pinia';
import { mande } from 'mande'
import { genCSRFOptions } from './CSRF';

export const useMinTimesStore = defineStore("MinTimesStore", {
    state: () => {
        return {
            hasMinTimes: false,
            minTimesError: false,
            minTimesUpdateError: false,

            SETTINGS_CHOICE: 0,  // 0 = defaults, 1 = lowdelay, 2 = custom

            MIN_COOL_OFF_TIME: 0,
            MIN_HEAT_OFF_TIME: 0,
            MIN_COOL_ON_TIME: 0,
            MIN_HEAT_ON_TIME: 0,
            MIN_COOL_OFF_TIME_FRIDGE_CONSTANT: 0,
            MIN_SWITCH_TIME: 0,
            COOL_PEAK_DETECT_TIME: 0,
            HEAT_PEAK_DETECT_TIME: 0,
        };
    },
    actions: {
        async getMinTimes() {
            try {
                const remote_api = mande("/api/mintimes/", genCSRFOptions());
                const response = await remote_api.get();
                if (response) {
                    this.hasMinTimes = true;
                    this.minTimesError = false;
                    this.SETTINGS_CHOICE = response.SETTINGS_CHOICE;
                    this.MIN_COOL_OFF_TIME = response.MIN_COOL_OFF_TIME;
                    this.MIN_HEAT_OFF_TIME = response.MIN_HEAT_OFF_TIME;
                    this.MIN_COOL_ON_TIME = response.MIN_COOL_ON_TIME;
                    this.MIN_HEAT_ON_TIME = response.MIN_HEAT_ON_TIME;
                    this.MIN_COOL_OFF_TIME_FRIDGE_CONSTANT = response.MIN_COOL_OFF_TIME_FRIDGE_CONSTANT;
                    this.MIN_SWITCH_TIME = response.MIN_SWITCH_TIME;
                    this.COOL_PEAK_DETECT_TIME = response.COOL_PEAK_DETECT_TIME;
                    this.HEAT_PEAK_DETECT_TIME = response.HEAT_PEAK_DETECT_TIME;
                } else {
                    await this.clearMinTimes();
                    this.minTimesError = true;
                }
            } catch (error) {
                await this.clearMinTimes();
                this.minTimesError = true;
            }
        },
        async clearMinTimes() {
            this.hasMinTimes = false;
            this.SETTINGS_CHOICE = 0;
            this.MIN_COOL_OFF_TIME = 0;
            this.MIN_HEAT_OFF_TIME = 0;
            this.MIN_COOL_ON_TIME = 0;
            this.MIN_HEAT_ON_TIME = 0;
            this.MIN_COOL_OFF_TIME_FRIDGE_CONSTANT = 0;
            this.MIN_SWITCH_TIME = 0;
            this.COOL_PEAK_DETECT_TIME = 0;
            this.HEAT_PEAK_DETECT_TIME = 0;
        },
        async setMinTimes(SETTINGS_CHOICE, MIN_COOL_OFF_TIME, MIN_HEAT_OFF_TIME, MIN_COOL_ON_TIME, MIN_HEAT_ON_TIME, MIN_COOL_OFF_TIME_FRIDGE_CONSTANT, MIN_SWITCH_TIME, COOL_PEAK_DETECT_TIME, HEAT_PEAK_DETECT_TIME) {
            try {
                const remote_api = mande("/api/mintimes/", genCSRFOptions());
                const response = await remote_api.put({
                    SETTINGS_CHOICE: SETTINGS_CHOICE,
                    MIN_COOL_OFF_TIME: MIN_COOL_OFF_TIME,
                    MIN_HEAT_OFF_TIME: MIN_HEAT_OFF_TIME,
                    MIN_COOL_ON_TIME: MIN_COOL_ON_TIME,
                    MIN_HEAT_ON_TIME: MIN_HEAT_ON_TIME,
                    MIN_COOL_OFF_TIME_FRIDGE_CONSTANT: MIN_COOL_OFF_TIME_FRIDGE_CONSTANT,
                    MIN_SWITCH_TIME: MIN_SWITCH_TIME,
                    COOL_PEAK_DETECT_TIME: COOL_PEAK_DETECT_TIME,
                    HEAT_PEAK_DETECT_TIME: HEAT_PEAK_DETECT_TIME,
                });
                if (response && response.message) {
                    // TODO - Check response.message
                    await this.getMinTimes();
                    this.minTimesUpdateError = false;
                } else {
                    await this.getMinTimes();
                    this.minTimesUpdateError = true;
                }
            } catch (error) {
                await this.getMinTimes();
                this.minTimesUpdateError = true;
            }
        }
    },
});