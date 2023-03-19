import { defineStore } from 'pinia';
import { mande } from 'mande'
import { genCSRFOptions } from './CSRF';

export const useExtendedSettingsStore = defineStore("ExtendedSettingsStore", {
    state: () => {
        return {
            hasExtendedSettings: false,
            extendedSettingsError: false,
            extendedSettingsUpdateError: false,

            glycol: false,
            largeTFT: false,
            invertTFT: false,

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
        async getExtendedSettings() {
            try {
                const remote_api = mande("/api/extended/", genCSRFOptions());
                const response = await remote_api.get();
                if (response && response.extendedSettings) {
                    this.hasExtendedSettings = true;
                    this.extendedSettingsError = false;

                    this.glycol = response.extendedSettings.glycol;
                    this.largeTFT = response.extendedSettings.largeTFT;
                    this.invertTFT = response.extendedSettings.invertTFT;

                    this.SETTINGS_CHOICE = response.minTimes.SETTINGS_CHOICE;
                    this.MIN_COOL_OFF_TIME = response.minTimes.MIN_COOL_OFF_TIME;
                    this.MIN_HEAT_OFF_TIME = response.minTimes.MIN_HEAT_OFF_TIME;
                    this.MIN_COOL_ON_TIME = response.minTimes.MIN_COOL_ON_TIME;
                    this.MIN_HEAT_ON_TIME = response.minTimes.MIN_HEAT_ON_TIME;
                    this.MIN_COOL_OFF_TIME_FRIDGE_CONSTANT = response.minTimes.MIN_COOL_OFF_TIME_FRIDGE_CONSTANT;
                    this.MIN_SWITCH_TIME = response.minTimes.MIN_SWITCH_TIME;
                    this.COOL_PEAK_DETECT_TIME = response.minTimes.COOL_PEAK_DETECT_TIME;
                    this.HEAT_PEAK_DETECT_TIME = response.minTimes.HEAT_PEAK_DETECT_TIME;
                } else {
                    await this.clearExtendedSettings();
                    this.extendedSettingsError = true;
                }
            } catch (error) {
                await this.clearExtendedSettings();
                this.extendedSettingsError = true;
            }
        },
        async clearExtendedSettings() {
            this.hasExtendedSettings = false;
            this.glycol = false;
            this.largeTFT = false;
            this.invertTFT = false;

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
        async setExtendedSettings(glycol, largeTFT, invertTFT) {
            try {
                const remote_api = mande("/api/extended/", genCSRFOptions());
                const response = await remote_api.put({
                    glycol: glycol,  // Boolean
                    largeTFT: largeTFT,  // Boolean
                    invertTFT: invertTFT, // Boolean
                });
                if (response && response.message) {
                    // TODO - Check response.message
                    await this.getExtendedSettings();
                    this.extendedSettingsUpdateError = false;
                } else {
                    await this.clearExtendedSettings();
                    this.extendedSettingsUpdateError = true;
                }
            } catch (error) {
                await this.clearExtendedSettings();
                this.extendedSettingsUpdateError = true;
            }
        },
        async setMinTimes(SETTINGS_CHOICE, MIN_COOL_OFF_TIME, MIN_HEAT_OFF_TIME, MIN_COOL_ON_TIME, MIN_HEAT_ON_TIME, MIN_COOL_OFF_TIME_FRIDGE_CONSTANT, MIN_SWITCH_TIME, COOL_PEAK_DETECT_TIME, HEAT_PEAK_DETECT_TIME) {
            try {
                const remote_api = mande("/api/extended/", genCSRFOptions());
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
                    await this.getExtendedSettings();
                    this.minTimesUpdateError = false;
                } else {
                    await this.getExtendedSettings();
                    this.minTimesUpdateError = true;
                }
            } catch (error) {
                await this.getExtendedSettings();
                this.minTimesUpdateError = true;
            }
        }
    },
});