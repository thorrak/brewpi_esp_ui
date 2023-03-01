<template>
  <div class="py-6">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Sensor/Actuator Configuration</h1>
    </div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <div class="py-4" v-if="BrewPiSensorStore.loaded">


        <div class="px-6 lg:px-8">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-xl font-semibold text-gray-900">Detected Devices</h1>
              <p class="mt-2 text-sm text-gray-700">A list of all sensors & actuators detected by the controller.</p>
            </div>
<!--            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">-->
<!--              <button type="button" class="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add user</button>-->
<!--            </div>-->
          </div>

          <div class="border-l-4 border-red-400 bg-red-50 p-4 mt-8" v-if="!hasFridgeSensor">
            <!-- If no fridge/chamber temp sensor is configured, show this warning -->
            <div class="flex">
              <div class="flex-shrink-0">
                <ExclamationTriangleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">
                  No fridge/chamber temperature sensor selected. No temperature control can take place.
                </p>
              </div>
            </div>
          </div>
          <div class="border-l-4 border-yellow-400 bg-yellow-50 p-4 mt-8" v-else-if="!hasBeerSensor">
            <!-- If no beer temp sensor is configured, show this warning -->
            <div class="flex">
              <div class="flex-shrink-0">
                <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div class="ml-3">
                <p class="text-sm text-yellow-700">
                  No beer temperature sensor selected. Cannot use beer constant/profile control modes.
                </p>
              </div>
            </div>
          </div>

          <div class="border-l-4 border-red-400 bg-red-50 p-4 mt-8" v-if="!hasHeatActuator && !hasCoolActuator">
            <!-- If there is neither a heat or cool relay configured, show this warning -->
            <div class="flex">
              <div class="flex-shrink-0">
                <ExclamationTriangleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">
                  Neither a heat or cool switch/relay is selected. No temperature control can take place.
                </p>
              </div>
            </div>
          </div>
          <div class="border-l-4 border-blue-400 bg-blue-50 p-4 mt-8" v-else-if="!hasHeatActuator || !hasCoolActuator">
            <!-- If there is neither a heat or cool relay configured, show this warning -->
            <div class="flex">
              <div class="flex-shrink-0">
                <InformationCircleIcon class="h-5 w-5 text-blue-400" aria-hidden="true" />
              </div>
              <div class="ml-3">
                <p class="text-sm text-blue-700">
                  <span v-if="!hasHeatActuator">No heat switch/relay is selected - temperature control will be cooling only.</span>
                  <span v-else>No cooling switch/relay is selected - temperature control will be heating only.</span>
                </p>
              </div>
            </div>
          </div>


          <div class="mt-8 flow-root">
            <div class="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">Type</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">Identifier</th>
<!--                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>-->
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Function</th>
                      <th scope="col" class="relative py-3.5 pl-3 pr-6 text-right">
                        <a href="#" type="button" class="inline-flex items-center rounded-full border border-transparent bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="refreshDevices">
                          <span class="hidden md:flex">Refresh Devices</span>
                          <span class="md:hidden">Refresh</span>
                        </a>
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="sensor in BrewPiSensorStore.devices" >
                      <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">
                        {{ sensor.device_hardware }}
                        <div class="md:hidden">
                          <div class="text-gray-500" v-if="sensor.device_hardware === 'Pin'">Pin {{ sensor.pin }}</div>
                          <div class="text-gray-500" v-if="sensor.device_hardware === 'OneWire Temp' || sensor.device_hardware === 'OneWire 2413' || sensor.device_hardware === 'Inkbird Bluetooth'">{{ sensor.address }}</div>
                          <div class="text-gray-500" v-if="sensor.device_hardware === 'TPLink Switch' || sensor.device_hardware === 'Tilt'">{{ sensor.device_alias }}</div>
                          <div class="text-gray-400" v-if="sensor.device_hardware === 'TPLink Switch'">{{ sensor.address }}</div>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden md:table-cell">
                        <div class="text-gray-900" v-if="sensor.device_hardware === 'Pin'">Pin {{ sensor.pin }}</div>
                        <div class="text-gray-900" v-if="sensor.device_hardware === 'OneWire Temp' || sensor.device_hardware === 'OneWire 2413' || sensor.device_hardware === 'Inkbird Bluetooth'">{{ sensor.address }}</div>
                        <div class="text-gray-900" v-if="sensor.device_hardware === 'TPLink Switch' || sensor.device_hardware === 'Tilt'">{{ sensor.device_alias }}</div>
                        <div class="text-gray-500" v-if="sensor.device_hardware === 'TPLink Switch'">{{ sensor.address }}</div>
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ sensor.device_function }}</td>
                      <td class="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                        <AssignSensorModal :sensor="sensor" v-on:device-updated="refreshDevices" />
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import { useBrewPiSensorStore } from "@/stores/BrewPiSensorStore";
import AssignSensorModal from "@/components/sensors/AssignSensorModal.vue";
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import { ref } from "vue";

export default {
  name: "ConfigSensorsActuators",
  components: {
    AssignSensorModal,
    ExclamationTriangleIcon,
    InformationCircleIcon,
  },
  mounted() {
    // Retrieve initial data
    this.BrewPiSensorStore.getDevices().then((response) => {
      this.updateDeviceFunctions();
    });

    // Set up periodic refreshes
    // window.setInterval(() => {
    //   this.BrewPiSensorStore.getDevices();
    // }, 5000)
  },
  setup() {
    const hasFridgeSensor = ref(false);
    const hasBeerSensor = ref(false);
    const hasHeatActuator = ref(false);
    const hasCoolActuator = ref(false);

    return {
      BrewPiSensorStore: useBrewPiSensorStore(),  // Updated in ConfigSensorsActuators.vue
      hasFridgeSensor,
      hasBeerSensor,
      hasHeatActuator,
      hasCoolActuator,
    }
  },
  methods: {
    refreshDevices: async function() {
      let loader = this.$loading.show({});
      await this.BrewPiSensorStore.clearDevices();
      await this.BrewPiSensorStore.getDevices();
      this.updateDeviceFunctions();
      loader.hide();
    },
    updateDeviceFunctions: function() {
      this.hasBeerSensor = this.BrewPiSensorStore.hasDeviceWithFunction(9);
      this.hasFridgeSensor = this.BrewPiSensorStore.hasDeviceWithFunction(5);
      this.hasHeatActuator = this.BrewPiSensorStore.hasDeviceWithFunction(2);
      this.hasCoolActuator = this.BrewPiSensorStore.hasDeviceWithFunction(3);
    }
  }
}
</script>

<style scoped>

</style>