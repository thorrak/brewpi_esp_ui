
export const DeviceFunctions = [
    "None",                 // 0
    "Chamber Door",         // 1
    "Heating Switch",       // 2 "Chamber Heat"
    "Cooling Switch",       // 3 "Chamber Cool"
    "Chamber Light",        // 4 (Maybe unused)
    "Chamber Temp",         // 5
    "Room Temp",            // 6
    "Chamber Fan",          // 7 (Maybe unused)
    "Chamber Reserved1",    // 8 (Unused)
    "Beer Temp",            // 9
    "Secondary Beer Temp",  // 10 (Unused)
    "Beer Heat",            // 11 (Unused)
    "Beer Cool",            // 12 (Unused)
    "Beer SG",              // 13 (Unused*) - We may break this out, due to the reuse of a single tilt for temps and SG
    "Beer Reserved1",       // 14 (Unused)
    "Beer Reserved2",       // 15 (Unused)
]

export const DeviceHardware = [
    "None",             // 0
    "Pin",              // 1
    "OneWire Temp",     // 2
    "OneWire 2413",     // 3
    "",                 // 4 (Reserved, modern BrewPi)
    "Inkbird Bluetooth",// 5
    "Tilt",             // 6
    "TPLink Switch",    // 7
]

export class BrewPiSensor {
    chamber;
    beer;
    device_function_int;
    hardware_int;
    pin;
    invert;
    deactivated;
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
        return DeviceFunctions[this.device_function_int];
    }

    get device_hardware() {
        return DeviceHardware[this.hardware_int];
    }

    set device_function(value) {
        this.device_function_int = DeviceFunctions.indexOf(value);
    }

    set device_hardware(value) {
        this.hardware_int = DeviceHardware.indexOf(value);
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
        if(this.hardware_int === 7)
            device_spec.n = this.child_id;
        if(this.calibrate_adjust !== 0 && (this.hardware_int === 2 || this.hardware_int === 5 || this.hardware_int === 6))
            device_spec.j = this.calibrate_adjust;

        return device_spec;
    }

    valid_functions() {
        // List of valid functions for this hardware type
        let valid_functions = [];
        valid_functions.push({id: 0, function_name: DeviceFunctions[0]});  // None (always available)

        if(this.hardware_int === 1) {  // Pin
            valid_functions.push({id: 1, function_name: DeviceFunctions[1]});  // Chamber Door
        }

        if(this.hardware_int === 1 || this.hardware_int === 2 || this.hardware_int === 3 || this.hardware_int === 7) {  // Pin / 2413 / TPLink
            valid_functions.push({id: 2, function_name: DeviceFunctions[2]});  // Chamber Heat
            valid_functions.push({id: 3, function_name: DeviceFunctions[3]});  // Chamber Cool
            // valid_functions.push({id: 4, function_name: DeviceFunctions[4]});  // Chamber Light
            // valid_functions.push({id: 7, function_name: DeviceFunctions[7]});  // Chamber Fan
        }

        if(this.hardware_int === 2 || this.hardware_int === 5 || this.hardware_int === 6) {  // OW / Inkbird / Tilt
            valid_functions.push({id: 5, function_name: DeviceFunctions[5]});  // Chamber Temp
            valid_functions.push({id: 6, function_name: DeviceFunctions[6]});  // Room Temp
            valid_functions.push({id: 9, function_name: DeviceFunctions[9]});  // Beer Temp
        }

        return valid_functions;
    }
}
