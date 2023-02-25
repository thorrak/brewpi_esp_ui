import { defineStore } from 'pinia';
import { mande } from 'mande'
import { genCSRFOptions } from './CSRF';

import { BrewPiSensor } from '../mixins/BrewPiSensor';



export const useBrewPiSensorStore = defineStore("BrewPiSensorStore", {
    state: () => {
        return {
            devices: [],
            loaded: false,
            devicesError: false,
            deviceUpdateError: false,
        };
    },
    actions: {
        async getDevices() {
            try {
                const remote_api = mande("/api/devices/", genCSRFOptions());
                const response = await remote_api.get();
                if (response && Array.isArray(response)) {
                    for(let i = 0; i < response.length; i++) {
                        let device = new BrewPiSensor();
                        await device.convertFromBrewPi(response[i]);
                        this.devices.push(device);
                    }
                    this.loaded = true;
                    this.devicesError = false;
                } else {
                    this.clearDevices();
                    this.devicesError = true;
                }
            } catch (error) {
                this.clearDevices();
                this.devicesError = true;
            }
        },
        async sendDeviceDefinition(newDeviceDefinition) {
            try {
                const remote_api = mande("/api/devices/", genCSRFOptions());
                // newDeviceDefinition is assumed to be in the BrewPi native format
                const response = await remote_api.put(newDeviceDefinition);
                if (response && response.message) {
                    // TODO - Check response.message
                    await this.getDevices();
                    this.deviceUpdateError = false;
                    return;
                } else {
                    this.deviceUpdateError = true;
                }
            } catch (error) {
                this.deviceUpdateError = true;
            }
        },
        async clearDevices() {
            this.devices = [];
            this.loaded = false;
            this.deviceUpdateError = false;
        }


    },
});