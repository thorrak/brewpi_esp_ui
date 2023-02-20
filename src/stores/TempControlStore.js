import { defineStore } from 'pinia';
import { mande } from 'mande'
import { genCSRFOptions } from './CSRF';

export const useTempControlStore = defineStore("TempControlStore", {
    state: () => {
        return {
            hasTempInfo: false,
            cc: null,
            cv: null,
            cs: null,
            tempInfo: null,
            tempInfoError: false,

            fridgeTemp: 0,
            beerTemp: 0,
            roomTemp: 0,
            tempFormat: "X",
        };
    },
    actions: {
        async getTempInfo() {
            try {
                const remote_api = mande("/api/all_temp_control/", genCSRFOptions());
                const response = await remote_api.get();
                if (response && response.cc) {
                    this.hasTempInfo = true;
                    this.tempInfoError = false;
                    this.cc = response.cc;
                    this.cv = response.cv;
                    this.cs = response.cs;
                    this.tempInfo = response.temp;
                    this.fridgeTemp = response.temp.FridgeTemp;
                    this.beerTemp = response.temp.BeerTemp;
                    this.roomTemp = response.temp.RoomTemp;
                    this.tempFormat = response.cc.tempFormat;
                } else {
                    await this.clearTempInfo();
                    this.tempInfoError = true;
                }
            } catch (error) {
                await this.clearTempInfo();
                this.tempInfoError = true;
            }
        },
        async clearTempInfo() {
            this.hasTempInfo = false;
            this.cc = null;
            this.cv = null;
            this.cs = null;
            this.tempInfo = null;
            this.fridgeTemp = 0;
            this.beerTemp = 0;
            this.roomTemp = 0;
            this.tempFormat = "X";
        }
    },
});