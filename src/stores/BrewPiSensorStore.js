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
                    await this.clearDevices();
                    for(let i = 0; i < response.length; i++) {
                        let device = new BrewPiSensor();
                        await device.convertFromBrewPi(response[i]);
                        this.devices.push(device);
                    }
                    this.loaded = true;
                    this.devicesError = false;
                } else {
                    await this.clearDevices();
                    this.devicesError = true;
                }
            } catch (error) {
                console.warn(error);
                await this.clearDevices();
                this.devicesError = true;
            }
        },
        async sendDeviceDefinition(newDeviceDefinition) {
            try {
                const remote_api = mande("/api/devices/", genCSRFOptions());
                // newDeviceDefinition is assumed to be in the BrewPi native format
                const response = await remote_api.put(newDeviceDefinition);
                this.deviceUpdateError = !(response && response.message);
            } catch (error) {
                this.deviceUpdateError = true;
            }
        },
        async clearDevices() {
            this.devices = [];
            this.loaded = false;
            this.deviceUpdateError = false;
        },
        findNextDeviceIndex() {
            let next_index = 0;
            let indices = [];

            if(!this.loaded)
                return -1;  // If we haven't loaded any devices, then we can't find a valid index

            // Fill the array with false (where 20 is MAX_DEVICES as specified in the firmware)
            for(let i = 0; i < 20; i++)
                indices[i] = false;

            // Loop over the loaded devices, and tag all used indices as true
            for(let i = 0; i < this.devices.length; i++) {
                if(this.devices[i].index >= 0) {
                    indices[this.devices[i].index] = true;
                }
            }

            // Find the first index that is false, and return it
            for(let i = 0; i < 20; i++)
                if(indices[i] === false)
                    return i;

            return -1;  // If we can't find an unused index, return -1
        },
        findDeviceByFunction(device_function) {
            for(let i = 0; i < this.devices.length; i++) {
                if(this.devices[i].device_function_int === device_function) {
                    return this.devices[i];
                }
            }
            return null;
        },
        hasDeviceWithFunction(device_function) {
            return this.findDeviceByFunction(device_function) != null;
        }


    },
});