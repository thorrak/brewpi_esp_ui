import { BrewPiSensor } from '@/mixins/BrewPiSensor.js';
import { i18n } from '@/i18n.js';  // Adjust this import based on your project structure

describe('BrewPiSensor', () => {
    it('can convert from BrewPi device spec', () => {
        const sensor = new BrewPiSensor();
        const device_spec = {
            c: 1,
            b: 2,
            f: 3,
            h: 4,
            p: 5,
            x: true,
            d: true,
            i: 6,
            a: "address",
            r: "alias",
            n: "child_id",
            j: 7,
        };
        sensor.convertFromBrewPi(device_spec);

        // add checks for each property
        expect(sensor.chamber).toBe(1);
        // ...
    });

    it('can convert to BrewPi device spec', () => {
        const sensor = new BrewPiSensor();
        // set up sensor properties...

        const device_spec = sensor.convertToBrewPi();

        // add checks for each property
        expect(device_spec.c).toBe(1);
        // ...
    });

    it('returns the correct device function', () => {
        const sensor = new BrewPiSensor();
        sensor.device_function_int = 1;

        const device_function = sensor.device_function;

        expect(device_function).toBe(i18n.global.t('sitewide.brewpi_device_functions.chamber_door'));
        // add similar checks for other values
    });

    it('returns the correct device hardware', () => {
        const sensor = new BrewPiSensor();
        sensor.hardware_int = 1;

        const device_hardware = sensor.device_hardware;

        expect(device_hardware).toBe(i18n.global.t('sitewide.brewpi_hardware_types.pin'));
        // add similar checks for other values
    });

    it('returns the correct valid functions for hardware type', () => {
        const sensor = new BrewPiSensor();
        sensor.hardware_int = 1;  // for pin

        const valid_functions = sensor.valid_functions();

        // add checks for each function
        expect(valid_functions).toContainEqual({id: 0, function_name: i18n.global.t('sitewide.brewpi_device_functions.none')});
        expect(valid_functions).toContainEqual({id: 1, function_name: i18n.global.t('sitewide.brewpi_device_functions.chamber_door')});
        // ...
    });
});
