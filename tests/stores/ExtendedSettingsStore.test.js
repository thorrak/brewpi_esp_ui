import { createTestingPinia } from '@pinia/testing';
import { setActivePinia, createPinia } from 'pinia';
import { useExtendedSettingsStore } from '@/stores/ExtendedSettingsStore.js';
import { mande } from 'mande';
import { jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';

jest.mock('mande');

describe('ExtendedSettingsStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('has correct initial state', () => {
        const store = useExtendedSettingsStore();
        expect(store.hasExtendedSettings).toBe(false);
        expect(store.extendedSettingsError).toBe(false);
        // TODO - add similar checks for other state properties
    });

    it('clears the extended settings correctly', async () => {
        const store = useExtendedSettingsStore();
        store.hasExtendedSettings = true;
        store.glycol = true;
        store.largeTFT = true;

        await store.clearExtendedSettings();

        expect(store.hasExtendedSettings).toBe(false);
        expect(store.glycol).toBe(false);
        expect(store.largeTFT).toBe(false);
        // TODO - add similar checks for other state properties
    });

    it('gets extended settings correctly', async () => {
        const fixturePath = path.join(__dirname, 'fixtures', 'api.extended.json');
        const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));

        const mockGet = jest.fn().mockResolvedValue(fixture);
        mande.mockImplementation(() => {
            return {
                get: mockGet,
            };
        });

        const store = useExtendedSettingsStore();

        await store.getExtendedSettings();

        expect(store.glycol).toBe(true);
        expect(store.largeTFT).toBe(true);
        expect(store.invertTFT).toBe(true);
        expect(store.SETTINGS_CHOICE).toBe(1);
        expect(store.MIN_COOL_OFF_TIME).toBe(100);
        // TODO - add similar checks for other state properties
    });

    it('sets extended settings correctly', async () => {
        // Prepare the fixture data
        const fixturePath = path.join(__dirname, 'fixtures', 'api.extended.json');
        const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));

        // Mock the mande library and the HTTP response
        const mockPut = jest.fn().mockResolvedValue({ message: "Settings updated" });
        mande.mockImplementation(() => {
            return {
                put: mockPut,
            };
        });

        const store = useExtendedSettingsStore();

        // Call the action
        await store.setExtendedSettings(true, true, true, 1, 100, 200, 300, 400, 500, 600, 700, 800);

        // Check the state properties after the action
        expect(store.glycol).toBe(true);
        expect(store.largeTFT).toBe(true);
        expect(store.invertTFT).toBe(true);
        expect(store.SETTINGS_CHOICE).toBe(1);
        expect(store.MIN_COOL_OFF_TIME).toBe(100);
        // add similar checks for other state properties

        // Check that the API was called with the correct parameters
        expect(mockPut).toHaveBeenCalledWith({
            glycol: true,
            largeTFT: true,
            invertTFT: true,
            SETTINGS_CHOICE: 1,
            MIN_COOL_OFF_TIME: 100,
            MIN_HEAT_OFF_TIME: 200,
            MIN_COOL_ON_TIME: 300,
            MIN_HEAT_ON_TIME: 400,
            MIN_COOL_OFF_TIME_FRIDGE_CONSTANT: 500,
            MIN_SWITCH_TIME: 600,
            COOL_PEAK_DETECT_TIME: 700,
            HEAT_PEAK_DETECT_TIME: 800,
        });
    });

    it('handles errors in setExtendedSettings', async () => {
        // Mock the mande library to throw an error
        const mockPut = jest.fn().mockRejectedValue(new Error('API error'));
        mande.mockImplementation(() => {
            return {
                put: mockPut,
            };
        });

        const store = useExtendedSettingsStore();

        // Call the action
        await store.setExtendedSettings(true, true, true, 1, 100, 200, 300, 400, 500, 600, 700, 800);

        // Check that the error state is set correctly
        expect(store.extendedSettingsUpdateError).toBe(true);

        // Check that the API was called with the correct parameters
        expect(mockPut).toHaveBeenCalledWith({
            glycol: true,
            largeTFT: true,
            invertTFT: true,
            SETTINGS_CHOICE: 1,
            MIN_COOL_OFF_TIME: 100,
            MIN_HEAT_OFF_TIME: 200,
            MIN_COOL_ON_TIME: 300,
            MIN_HEAT_ON_TIME: 400,
            MIN_COOL_OFF_TIME_FRIDGE_CONSTANT: 500,
            MIN_SWITCH_TIME: 600,
            COOL_PEAK_DETECT_TIME: 700,
            HEAT_PEAK_DETECT_TIME: 800,
        });
    });

});
