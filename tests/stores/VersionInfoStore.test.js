import { createTestingPinia } from '@pinia/testing';
import { setActivePinia, createPinia } from 'pinia'
import { useVersionInfoStore } from '@/stores/VersionInfoStore.js';
import { mande } from 'mande';
import { jest } from '@jest/globals';

// jest.mock('mande', () => {
//     return {
//         mande: jest.fn(),
//     };
// });

jest.mock('mande');

describe('VersionInfoStore', () => {
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it
        setActivePinia(createPinia());
    });

    it('has correct initial state', () => {
        const store = useVersionInfoStore();
        expect(store.hasVersionInfo).toBe(false);
        expect(store.versionInfoError).toBe(false);
        // add similar checks for other state properties
    });

    it('clears the version info correctly', async () => {
        const store = useVersionInfoStore();
        // setting some state properties
        expect(store.hasVersionInfo).toBe(false);
        store.hasVersionInfo = true;
        store.brewpiVersion = "some version";

        await store.clearVersionInfo();

        expect(store.hasVersionInfo).toBe(false);
        expect(store.brewpiVersion).toBe("");
        // add similar checks for other state properties
    });

    it('gets version info correctly', async () => {
        // Mock the mande library and the HTTP response here
        const mockGet = jest.fn().mockResolvedValue({
            v: 'version',
            n: 'revision',
            c: 'tag',
            s: 'shield',
            b: 'board',
            l: 'log',
            e: 'ferment',
        });
        mande.mockImplementation(() => {
            return {
                get: mockGet,
            };
        });

        const store = useVersionInfoStore();

        await store.getVersionInfo();

        // Check the state properties after the getVersionInfo action
        expect(store.brewpiVersion).toBe('version');
        expect(store.gitRevision).toBe('revision');
        expect(store.gitTag).toBe('tag');
        expect(store.brewpiShield).toBe('shield');
        expect(store.brewpiBoard).toBe('board');
        expect(store.brewpiLogMessagesVersion).toBe('log');
        expect(store.fermenttempVersion).toBe('ferment');
    });
});
