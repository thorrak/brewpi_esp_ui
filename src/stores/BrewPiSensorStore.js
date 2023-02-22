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
                    this.loaded = false;
                    this.devicesError = true;
                    this.devices = [];
                }
            } catch (error) {
                this.loaded = false;
                this.devicesError = true;
                this.devices = [];
            }
        },


    },
});