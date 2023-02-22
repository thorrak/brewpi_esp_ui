
export const DeviceFunctions = [
    "None",
    "Chamber Door",
    "Chamber Heat",
    "Chamber Cool",
    "Chamber Light",
    "Chamber Temp",
    "Room Temp",
    "Chamber Fan",
    "Chamber Reserved1",
    "Beer Temp",
    "Secondary Beer Temp",
    "Beer Heat",
    "Beer Cool",
    "Beer SG",
    "Beer Reserved1",
    "Beer Reserved2",
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

    convertFromBrewPi(device_spec) {
        this.chamber = device_spec.c;
        this.beer = device_spec.b;
        this.device_function_int = device_spec.f;
        this.hardware_int = device_spec.h;
        this.pin = device_spec.p;
        this.invert = device_spec.x;
        this.deactivated = device_spec.d;
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
        };
        if(this.address.length > 0)
            device_spec.a = this.address;
        if(this.device_alias.length > 0)
            device_spec.r = this.device_alias;
        if(this.child_id.length > 0)
            device_spec.n = this.child_id;
        if(this.calibrate_adjust != 0)
            device_spec.j = this.calibrate_adjust;
        return device_spec;
    }
}
