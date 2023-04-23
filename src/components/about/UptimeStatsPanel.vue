<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="flex-initial md:container">
      <div class="bg-white overflow-hidden sm:rounded-lg sm:shadow">

        <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Version & Uptime Information
          </h3>
        </div>

        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Firmware Version
                    </th>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      BrewPi-ESP v{{ VersionInfoStore.fermenttempVersion }} ({{ VersionInfoStore.gitRevision }})
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uptime
                    </th>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Days: {{ UptimeStatsStore.days }}, Hours: {{ UptimeStatsStore.hours }}, Minutes: {{ UptimeStatsStore.minutes }}, Seconds: {{ UptimeStatsStore.seconds }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reset Information
                    </th>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Reason: {{ ResetReasonStore.reason }}, Description: {{ ResetReasonStore.description }}
                    </td>
                  </tr>
                  <tr v-if="HeapInfoStore.hasHeapInfo">
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Heap Information
                    </th>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Free Heap: {{ HeapInfoStore.free }}, Max: {{ HeapInfoStore.max }}, Frags: {{ HeapInfoStore.frag }}
                    </td>
                  </tr>

                  <!--                  <tr v-for="person in people" :key="person.email">-->
                  <!--                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">-->
                  <!--                      {{ person.name }}-->
                  <!--                    </td>-->
                  <!--                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-->
                  <!--                      {{ person.title }}-->
                  <!--                    </td>-->
                  <!--                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-->
                  <!--                      {{ person.email }}-->
                  <!--                    </td>-->
                  <!--                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-->
                  <!--                      {{ person.role }}-->
                  <!--                    </td>-->
                  <!--                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">-->
                  <!--                      <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>-->
                  <!--                    </td>-->
                  <!--                  </tr>-->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import { useUptimeStatsStore } from "@/stores/UptimeStatsStore";
import { useVersionInfoStore } from "@/stores/VersionInfoStore";
import { useHeapInfoStore } from "@/stores/HeapInfoStore";
import { useResetReasonStore } from "@/stores/ResetReasonStore";

export default {
  name: "UptimeStatsPanel",
  mounted() {
    // Retrieve initial data
    this.UptimeStatsStore.getUptimeStats();
    this.VersionInfoStore.getVersionInfo();
    this.HeapInfoStore.getHeapInfo();
    this.ResetReasonStore.getResetReason();

    // Set up periodic refreshes
    this.statsIntervalObject = window.setInterval(() => {
      this.UptimeStatsStore.getUptimeStats();
    }, 10000)
    this.heapIntervalObject = window.setInterval(() => {
      this.HeapInfoStore.getHeapInfo();
    }, 9000)
    this.resetIntervalObject = window.setInterval(() => {
      this.ResetReasonStore.getResetReason();
    }, 60000)
  },
  setup() {
    return {
      UptimeStatsStore: useUptimeStatsStore(),  // Updated in UptimeStatsPanel.vue
      VersionInfoStore: useVersionInfoStore(),  // Updated in UptimeStatsPanel.vue
      HeapInfoStore: useHeapInfoStore(),  // Updated in UptimeStatsPanel.vue
      ResetReasonStore: useResetReasonStore(),  // Updated in UptimeStatsPanel.vue
    }
  },
  data() {
    return {
      statsIntervalObject: null,
      heapIntervalObject: null,
      resetIntervalObject: null,
    }
  },
  beforeUnmount() {
    clearInterval(this.statsIntervalObject);
    clearInterval(this.heapIntervalObject);
    clearInterval(this.resetIntervalObject);
  },
}
</script>

<style scoped>

</style>