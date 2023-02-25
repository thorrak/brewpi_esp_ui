import { defineStore } from 'pinia';
import { mande } from 'mande'
import { genCSRFOptions } from './CSRF';

export const useHeapInfoStore = defineStore("HeapInfoStore", {
    state: () => {
        return {
            free: 0,
            max: 0,
            frag: 0,
            hasHeapInfo: false,
            heapError: false,
        };
    },
    actions: {
        async getHeapInfo() {
            try {
                const remote_api = mande("/api/heap/", genCSRFOptions());
                const response = await remote_api.get();
                if (response && response.free) {
                    this.free = response.free;
                    this.max = response.max;
                    this.frag = response.frag;
                    this.hasHeapInfo = true;
                    this.heapError = false;
                } else {
                    await this.clearHeapInfo();
                    this.heapError = true;
                }
            } catch (error) {
                await this.clearHeapInfo();
                this.heapError = true;
            }
        },
        async clearHeapInfo() {
            this.free = 0;
            this.max = 0;
            this.frag = 0;
            this.hasHeapInfo = false;
        }
    },
});