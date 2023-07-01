
function device_function_for_index(function_index) {
    switch (function_index) {
        case 0:
            return i18n.global.t('sitewide.brewpi_device_functions.none');
        case 1:
            return i18n.global.t('sitewide.brewpi_device_functions.chamber_door');
        case 2:
            return i18n.global.t('sitewide.brewpi_device_functions.heating_switch');
        case 3:
            return i18n.global.t('sitewide.brewpi_device_functions.cooling_switch');
        case 4:
            return i18n.global.t('sitewide.brewpi_device_functions.chamber_light');
        case 5:
            return i18n.global.t('sitewide.brewpi_device_functions.chamber_temp');
        case 6:
            return i18n.global.t('sitewide.brewpi_device_functions.room_temp');
        case 7:
            return i18n.global.t('sitewide.brewpi_device_functions.chamber_fan');
        case 8:
            return i18n.global.t('sitewide.brewpi_device_functions.chamber_reserved_1');
        case 9:
            return i18n.global.t('sitewide.brewpi_device_functions.beer_temp');
        case 10:
            return i18n.global.t('sitewide.brewpi_device_functions.secondary_beer_temp');
        case 11:
            return i18n.global.t('sitewide.brewpi_device_functions.beer_heat');
        case 12:
            return i18n.global.t('sitewide.brewpi_device_functions.beer_cool');
        case 13:
            return i18n.global.t('sitewide.brewpi_device_functions.beer_sg');
        case 14:
            return i18n.global.t('sitewide.brewpi_device_functions.beer_reserved_1');
        case 15:
            return i18n.global.t('sitewide.brewpi_device_functions.beer_reserved_2');
        default:
            return i18n.global.t('sitewide.unknown');
    }
}


function device_hardware_for_index(index) {
    switch (index) {
        case 0:
            return i18n.global.t('sitewide.brewpi_hardware_types.none');
        case 1:
            return i18n.global.t('sitewide.brewpi_hardware_types.pin');
        case 2:
            return i18n.global.t('sitewide.brewpi_hardware_types.onewire_temp');
        case 3:
            return i18n.global.t('sitewide.brewpi_hardware_types.onewire_2413');
        case 4:
            // This is not implemented, and is just here as a placeholder
            return i18n.global.t('sitewide.brewpi_hardware_types.four');
        case 5:
            return i18n.global.t('sitewide.brewpi_hardware_types.inkbird_bluetooth');
        case 6:
            return i18n.global.t('sitewide.brewpi_hardware_types.tilt');
        case 7:
            return i18n.global.t('sitewide.brewpi_hardware_types.tplink_switch');
        default:
            return i18n.global.t('sitewide.brewpi_hardware_types.unknown');
    }
}


export class BrewPiSensor {
    chamber;
    beer;
    device_function_int;
    hardware_int;
    pin;
    invert = false;
    deactivated = false;
    address = "";
    device_alias = "";
    child_id = "";
    calibrate_adjust = 0;
    index=-1;

    convertFromBrewPi(device_spec) {
        this.chamber = device_spec.c;
        this.beer = device_spec.b;
        this.device_function_int = device_spec.f;
        this.hardware_int = device_spec.h;
        this.pin = device_spec.p;
        this.invert = device_spec.x;
        this.deactivated = device_spec.d;
        this.index = device_spec.i;
        if(device_spec.a)
            this.address = device_spec.a;
        if(device_spec.r)
            this.device_alias = device_spec.r;
        if(device_spec.n)
            this.child_id = device_spec.n;
        if(device_spec.j)
            this.calibrate_adjust = device_spec.j;
    }
    
    get device_function() {
        return device_function_for_index(this.device_function_int);
    }

    get device_hardware() {
        return device_hardware_for_index(this.hardware_int);
    }

    convertToBrewPi() {
        let device_spec = {
            c: this.chamber,
            b: this.beer,
            f: this.device_function_int,
            h: this.hardware_int,
            p: this.pin,
            x: this.invert,
            d: this.deactivated,
            i: this.index,
        };
        if(this.address.length > 0)
            device_spec.a = this.address;
        // if(this.device_alias.length > 0)
        //     device_spec.r = this.device_alias;
        if(this.child_id.length > 0)
            device_spec.n = this.child_id;
        if(this.calibrate_adjust !== 0 && (this.hardware_int === 2 || this.hardware_int === 5 || this.hardware_int === 6))
            device_spec.j = this.calibrate_adjust;

        return device_spec;
    }

    valid_functions() {
        // List of valid functions for this hardware type
        let valid_functions = [];
        valid_functions.push({id: 0, function_name: device_function_for_index(0)});  // None (always available)

        if(this.hardware_int === 1) {  // Pin
            valid_functions.push({id: 1, function_name: device_function_for_index(1)});  // Chamber Door
        }

        if(this.hardware_int === 1 || this.hardware_int === 2 || this.hardware_int === 3 || this.hardware_int === 7) {  // Pin / 2413 / TPLink
            valid_functions.push({id: 2, function_name: device_function_for_index(2)});  // Chamber Heat
            valid_functions.push({id: 3, function_name: device_function_for_index(3)});  // Chamber Cool
            // valid_functions.push({id: 4, function_name: device_function_for_index(4)});  // Chamber Light
            // valid_functions.push({id: 7, function_name: device_function_for_index(7)});  // Chamber Fan
        }

        if(this.hardware_int === 2 || this.hardware_int === 5 || this.hardware_int === 6) {  // OW / Inkbird / Tilt
            valid_functions.push({id: 5, function_name: device_function_for_index(5)});  // Chamber Temp
            valid_functions.push({id: 6, function_name: device_function_for_index(6)});  // Room Temp
            valid_functions.push({id: 9, function_name: device_function_for_index(9)});  // Beer Temp
        }

        return valid_functions;
    }
}
