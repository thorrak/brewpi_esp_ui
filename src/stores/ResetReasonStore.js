import { defineStore } from 'pinia';
import { mande } from 'mande'
import { genCSRFOptions } from './CSRF';

export const useResetReasonStore = defineStore("ResetReasonStore", {
    state: () => {
        return {
            reason: "",
            description: "",
            hasResetReason: false,
            resetReasonError: false,
        };
    },
    actions: {
        async getResetReason() {
            try {
                const remote_api = mande("/api/resetreason/", genCSRFOptions());
                const response = await remote_api.get();
                if (response && response.reason) {
                    this.reason = response.reason;
                    this.description = response.description;
                    this.hasResetReason = true;
                    this.resetReasonError = false;
                } else {
                    await this.clearResetReason();
                    this.resetReasonError = true;
                }
            } catch (error) {
                await this.clearResetReason();
                this.resetReasonError = true;
            }
        },
        async clearResetReason() {
            this.reason = "";
            this.description = "";
            this.hasResetReason = false;
        }
    },
});