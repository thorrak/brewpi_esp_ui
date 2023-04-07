<template>
  <div class="py-6">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Fermentrack Settings</h1>
    </div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <div class="py-4">

        <div>
          <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="submitForm">
            <div class="space-y-8 divide-y divide-gray-200">
              <div>
                <h3 class="text-lg font-medium leading-6 text-gray-900">Upstream Status</h3>
                <p class="mt-1 text-sm text-gray-500">How this controller communicates with Fermentrack</p>
<pre>
Upstream Host: {{ UpstreamSettingsStore.upstreamHost }}
Upstream Port: {{ UpstreamSettingsStore.upstreamPort }}
Upstream Device ID: {{ UpstreamSettingsStore.deviceID }}
Upstream Username: {{ UpstreamSettingsStore.username }}
Upstream API Key: {{ UpstreamSettingsStore.apiKey }}
</pre>
              </div>



              <div v-if="UpstreamSettingsStore.hasUpstreamSettings">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">Upstream Settings</h3>
                  <!-- TODO - Change "Fermentrack" out here if Lee ever adds support for REST controllers to BPR -->
                  <p class="mt-1 text-sm text-gray-500">How this controller communicates with Fermentrack</p>
                </div>

                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div class="sm:col-span-4">
                    <label for="hostname" class="block text-sm font-medium text-gray-700">Hostname</label>
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">http://</span>
                      <input type="text" name="hostname" v-model="UpstreamSettingsStore.upstreamHost" id="hostname" autocomplete="hostname" class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>
                  </div>

                  <div class="sm:col-span-4">
                    <label for="port" class="block text-sm font-medium text-gray-700">Port</label>
                    <div class="mt-1">
                      <input id="port" name="port" v-model="UpstreamSettingsStore.upstreamPort" type="text" autocomplete="port" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>
                  </div>

                  <div class="sm:col-span-4">
                    <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                    <div class="mt-1">
                      <input type="text" name="username" v-model="UpstreamSettingsStore.username" id="username" autocomplete="username" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>
                  </div>


                  <div class="sm:col-span-4">
                    <label for="deviceid" class="block text-sm font-medium text-gray-700">Device ID</label>
                    <div class="mt-1">
                      <span v-if="UpstreamSettingsStore.deviceID.length <= 0">(Not yet registered)</span>
                      <span v-else>{{ UpstreamSettingsStore.deviceID }}</span>

                      <!--                <input id="deviceid" name="deviceid" v-model="UpstreamSettingsStore.deviceID" type="text" autocomplete="deviceid" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" disabled />-->
                    </div>
                  </div>

                  <div class="sm:col-span-4">
                    <div class="relative flex items-start">
                      <div class="flex h-5 items-center">
                        <input id="resetDeviceID" name="resetDeviceID" v-model="resetDeviceID" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="resetDeviceID" class="font-medium text-gray-700">Reset Device ID</label>
                        <p class="text-gray-500">Delete device ID and re-register with upstream. Warning - cannot be undone!</p>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>

            <div class="pt-5">
              <div class="flex justify-end">
                <!--          <button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>-->
                <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUpstreamSettingsStore } from "@/stores/UpstreamSettingsStore";

export default {
  name: "UpstreamSettings",
  setup() {
    return {
      UpstreamSettingsStore: useUpstreamSettingsStore()  // Updated in UpstreamSettings.vue
    }
  },
  data() {
    return {
      resetDeviceID: false
    }
  },
  mounted() {
    // Retrieve initial data
    this.UpstreamSettingsStore.getUpstreamSettings();

    // Set up periodic refreshes
    // window.setInterval(() => {
    //   this.UpstreamSettingsStore.getUpstreamSettings();
    // }, 30000)  // Do we really want to update this? Probably not.
  },
  methods: {
    async submitForm() {
      // Validate the information in the form
      if(this.UpstreamSettingsStore.upstreamHost.length >= 127) {
        // TODO - Add feedback here
        // this.form_error_message = "Hostname is invalid. Must be less than 127 characters.";
        return;
      }

      if(parseInt(this.UpstreamSettingsStore.upstreamPort) >= 65535 || parseInt(this.UpstreamSettingsStore.upstreamPort) <= 10) {
        this.form_error_message = "Port number must be between 10 and 65535 (but is typically 80)";
        return;
      }

      if(this.UpstreamSettingsStore.username.length >= 127) {
        // TODO - Add feedback here
        // this.form_error_message = "Username is invalid. Must be less than 127 characters.";
        return;
      }

      let loader = this.$loading.show({});
      await this.UpstreamSettingsStore.setUpstreamSettings(this.UpstreamSettingsStore.upstreamHost, this.UpstreamSettingsStore.upstreamPort, this.resetDeviceID, this.UpstreamSettingsStore.username);
      loader.hide();

      // this.updateSuccessful = res.ok;
      // this.alertOpen = true;
      // this.UpstreamSettingsStore.saveUpstreamSettings();
    },

  }
}
</script>

<style scoped>

</style>