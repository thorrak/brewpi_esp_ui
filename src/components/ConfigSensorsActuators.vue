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
          <div class="mt-8 flow-root">
            <div class="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">Type</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Identifier</th>
<!--                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>-->
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Function</th>
                      <th scope="col" class="relative py-3.5 pl-3 pr-6">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="sensor in BrewPiSensorStore.devices" >
                      <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">{{ sensor.device_hardware }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div class="text-gray-900" v-if="sensor.device_hardware === 'Pin'">Pin {{ sensor.pin }}</div>
                        <div class="text-gray-900" v-if="sensor.device_hardware === 'OneWire Temp' || sensor.device_hardware === 'OneWire 2413' || sensor.device_hardware === 'Inkbird Bluetooth'">{{ sensor.address }}</div>
                        <div class="text-gray-900" v-if="sensor.device_hardware === 'TPLink Switch' || sensor.device_hardware === 'Tilt'">{{ sensor.device_alias }}</div>
                        <div class="text-gray-500" v-if="sensor.device_hardware === 'TPLink Switch'">{{ sensor.address }}</div>
                      </td>
<!--                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ sensor.chamber }}</td>-->
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ sensor.device_function }}</td>
                      <td class="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                        <AssignSensorModal :sensor="sensor" />
<!--                        <a href="#" class="text-indigo-600 hover:text-indigo-900">-->
<!--                          <span v-if="sensor.device_function === 'None'">Assign</span>-->
<!--                          <span v-else>Assign</span>-->
<!--                          <span class="sr-only">, {{ sensor.device_hardware }}</span>-->
<!--                        </a>-->
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

export default {
  name: "ConfigSensorsActuators",
  components: {AssignSensorModal},
  mounted() {
    // Retrieve initial data
    this.BrewPiSensorStore.getDevices();

    // Set up periodic refreshes
    // window.setInterval(() => {
    //   this.BrewPiSensorStore.getDevices();
    // }, 5000)
  },
  setup() {
    return {
      BrewPiSensorStore: useBrewPiSensorStore(),  // Updated in ConfigSensorsActuators.vue
    }
  },
}
</script>

<style scoped>

</style>