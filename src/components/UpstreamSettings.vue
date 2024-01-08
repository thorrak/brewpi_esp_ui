<template>
  <div class="py-6">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">{{ $t("sitewide.sidebar_options.fermentrack_settings") }}</h1>
    </div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <div class="py-4">

        <div>
          <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="submitForm" data-form-type="other">
            <div class="space-y-8 divide-y divide-gray-200">

              <div v-if="UpstreamSettingsStore.hasUpstreamSettings">
                <!-- Display errors from the upstream registration process -->
                <div v-if="UpstreamSettingsStore.loadedUpstreamSettingsFromDevice">
                  <div class="border-l-4 border-red-400 bg-red-50 p-4 mb-4 mt-4" v-if="UpstreamSettingsStore.upstreamRegistrationError === 1 || UpstreamSettingsStore.upstreamRegistrationError === 5 || UpstreamSettingsStore.upstreamRegistrationError === 6">
                    <!-- Error 1 (missing GUID), Error 5 (missing hardware), Error 6 (missing firmware version) are all internal -->
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <ExclamationTriangleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div class="ml-3">
                        <p class="text-sm text-red-700">
                          {{ $t("upstream_settings.missing_data_error") }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="border-l-4 border-red-400 bg-red-50 p-4 mb-4 mt-4" v-else-if="UpstreamSettingsStore.upstreamRegistrationError === 3">
                    <!-- Error 3 - User not found -->
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <ExclamationTriangleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div class="ml-3">
                        <p class="text-sm text-red-700">
                          {{ $t("upstream_settings.invalid_username_error") }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="border-l-4 border-red-400 bg-red-50 p-4 mb-4 mt-4" v-else-if="UpstreamSettingsStore.upstreamRegistrationError === 7">
                    <!-- Error 7 - API Key is not associated with a brewhouse -->
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <ExclamationTriangleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div class="ml-3">
                        <p class="text-sm text-red-700">
                          {{ $t("upstream_settings.bad_api_key_error") }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="border-l-4 border-red-400 bg-red-50 p-4 mb-4 mt-4" v-else-if="UpstreamSettingsStore.upstreamRegistrationError === 4">
                    <!-- Error 4 - User does not have a brewhouse -->
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <ExclamationTriangleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div class="ml-3">
                        <p class="text-sm text-red-700">
                          {{ $t("upstream_settings.bad_api_key_error") }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="border-l-4 border-red-400 bg-red-50 p-4 mb-4 mt-4" v-else-if="UpstreamSettingsStore.upstreamRegistrationError === 2 || (UpstreamSettingsStore.username === '' && UpstreamSettingsStore.apiKey === '')">
                    <!-- Error 2 - Missing username or API key -->
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <ExclamationTriangleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div class="ml-3">
                        <p class="text-sm text-red-700">
                          {{ $t("upstream_settings.no_username_error") }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="border-l-4 border-yellow-400 bg-yellow-50 p-4 mt-4 mb-4" v-else-if="UpstreamSettingsStore.upstreamRegistrationError === 8">
                    <!-- Error 2 - Missing username or API key -->
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      </div>
                      <div class="ml-3">
                        <p class="text-sm text-yellow-700">
                          {{ $t("upstream_settings.waiting_to_register_error") }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="border-l-4 border-red-400 bg-red-50 p-4 mb-4 mt-4" v-else-if="UpstreamSettingsStore.upstreamRegistrationError === 9">
                    <!-- Error 9 - Registration endpoint error -->
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <ExclamationTriangleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div class="ml-3">
                        <p class="text-sm text-red-700">
                          {{ $t("upstream_settings.unable_to_reach_fermentrack_error") }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="UpstreamSettingsStore.upstreamRegistrationError === 0">
                    <div class="border-l-4 border-green-400 bg-green-50 p-4 mb-4 mt-4">
                      <!-- Error 0 - No error -->
                      <div class="flex">
                        <div class="flex-shrink-0">
                          <InformationCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
                        </div>
                        <div class="ml-3">
                          <p class="text-sm text-green-700">
                            {{ $t("upstream_settings.successful_registration_msg") }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="border-l-4 border-indigo-400 bg-indigo-50 p-4 mb-4 mt-4">
                      <!-- Note about telnet being disabled -->
                      <div class="flex">
                        <div class="flex-shrink-0">
                          <InformationCircleIcon class="h-5 w-5 text-indigo-400" aria-hidden="true" />
                        </div>
                        <div class="ml-3">
                          <p class="text-sm text-indigo-700">
                            {{ $t("upstream_settings.telnet_interface_unavailable") }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="border-l-4 border-red-400 bg-red-50 p-4 mb-4 mt-4" v-else>
                    <!-- Error code not captured. Means that Fermentrack is probably more recent than this firmware -->
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <ExclamationTriangleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div class="ml-3">
                        <p class="text-sm text-red-700">
                          {{ $t("upstream_settings.unknown_error") }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>


                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">{{ $t("upstream_settings.upstream_settings_header") }}</h3>
                  <p class="mt-1 text-sm text-gray-500">{{ $t("upstream_settings.upstream_settings_msg") }}</p>
                </div>

                <!-- TODO - Make it so there is a "default options" setting for Fermentrack.net rather than having the user enter their username and API key -->

                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div class="sm:col-span-4">
                    <label for="hostname" class="block text-sm font-medium text-gray-700">{{ $t("upstream_settings.hostname") }}</label>
                    <div class="mt-1">
                      <!-- Note - There is no actual differentiation between HTTPS and HTTP as the controller currently only can use HTTP for outgoing connections -->
                      <div v-if="UpstreamSettingsStore.deviceID === '' && !UpstreamSettingsStore.awaitingRegistration" class="flex rounded-md shadow-sm">
                        <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm" v-if="UpstreamSettingsStore.upstreamPort === 443">http://</span>
                        <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm" v-else>http://</span>
                        <input type="text" name="hostname" v-model="UpstreamSettingsStore.upstreamHost"  id="hostname" class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                      </div>
                      <span v-else>
                        <span v-if="UpstreamSettingsStore.upstreamPort === 443">http://</span><span v-else>http://</span>{{ UpstreamSettingsStore.upstreamHost }}
                      </span>
                    </div>
                  </div>

                  <div class="sm:col-span-4">
                    <label for="port" class="block text-sm font-medium text-gray-700">{{ $t("upstream_settings.port") }}</label>
                    <div class="mt-1">
                      <input id="port" name="port" v-model="UpstreamSettingsStore.upstreamPort" v-if="UpstreamSettingsStore.deviceID === '' && !UpstreamSettingsStore.awaitingRegistration" type="text" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                      <span v-else>{{ UpstreamSettingsStore.upstreamPort }}</span>
                    </div>
                  </div>

                  <div class="sm:col-span-4" v-if="UpstreamSettingsStore.deviceID === '' && !UpstreamSettingsStore.awaitingRegistration">
                    <label for="username" class="block text-sm font-medium text-gray-700">{{ $t("upstream_settings.username") }}</label>
                    <div class="mt-1">
                      <input type="text" name="username" v-model="UpstreamSettingsStore.username" id="username" data-form-type="other" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>
                  </div>


                  <div class="sm:col-span-4">
                    <label for="deviceid" class="block text-sm font-medium text-gray-700">{{ $t("upstream_settings.device_id") }}</label>
                    <div class="mt-1">
                      <span v-if="UpstreamSettingsStore.deviceID.length <= 0">{{ $t("upstream_settings.not_yet_registered") }}</span>
                      <span v-else>{{ UpstreamSettingsStore.deviceID }}</span>

                      <!--                <input id="deviceid" name="deviceid" v-model="UpstreamSettingsStore.deviceID" type="text" autocomplete="deviceid" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" disabled />-->
                    </div>
                  </div>

                  <div class="sm:col-span-4">
                    <label for="deviceid" class="block text-sm font-medium text-gray-700">GUID</label>
                    <div class="mt-1">
                      <span>{{ UpstreamSettingsStore.guid }}</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div class="pt-5">
              <div class="flex justify-end">
                <!--          <button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>-->
                <button v-if="UpstreamSettingsStore.deviceID === ''" type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">{{ $t("sitewide.save") }}</button>
                <button v-else type="button" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" @click="clearRegistration()">{{ $t("upstream_settings.reset_registration") }}</button>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUpstreamSettingsStore } from "@/stores/UpstreamSettingsStore";
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import { useLoading } from "vue-loading-overlay";
const $loading = useLoading({});
import {onMounted, ref} from "vue";

const UpstreamSettingsStore = useUpstreamSettingsStore();  // Updated in UpstreamSettings.vue

let loader;


onMounted(() => {
  // Retrieve initial data
  loader = $loading.show({});
  UpstreamSettingsStore.getUpstreamSettings().then(() => {
    loader.hide();
  }).catch(() => {
    loader.hide();
  });
});



async function submitForm() {
  // Validate the information in the form
  if(UpstreamSettingsStore.upstreamHost.length >= 127) {
    // TODO - Add feedback here
    // this.form_error_message = "Hostname is invalid. Must be less than 127 characters.";
    return;
  }

  if(parseInt(UpstreamSettingsStore.upstreamPort) >= 65535 || parseInt(UpstreamSettingsStore.upstreamPort) <= 10) {
    this.form_error_message = "Port number must be between 10 and 65535 (but is typically 80)";
    return;
  }

  if(UpstreamSettingsStore.username.length >= 127) {
    // TODO - Add feedback here
    // this.form_error_message = "Username is invalid. Must be less than 127 characters.";
    return;
  }

  loader = $loading.show({});
  // TODO - Convert this from await to a promise
  await UpstreamSettingsStore.setUpstreamSettings(UpstreamSettingsStore.upstreamHost, UpstreamSettingsStore.upstreamPort, UpstreamSettingsStore.username, UpstreamSettingsStore.apiKey);
  await UpstreamSettingsStore.getUpstreamSettings(); // Once we've set the upstream settings, let's retrieve them to make sure they saved
  loader.hide();
  // TODO - Add some kind of error checking/handling here

  // this.updateSuccessful = res.ok;
  // this.alertOpen = true;
  // this.UpstreamSettingsStore.saveUpstreamSettings();
}

async function clearRegistration() {
  loader = $loading.show({});
  // TODO - Convert this from await to a promise
  await UpstreamSettingsStore.setUpstreamSettings("", 80, "", "");
  await UpstreamSettingsStore.getUpstreamSettings(); // Once we've set the upstream settings, let's retrieve them to make sure they saved
  loader.hide();
  // TODO - Add some kind of error checking/handling here

  // this.updateSuccessful = res.ok;
  // this.alertOpen = true;
  // this.UpstreamSettingsStore.saveUpstreamSettings();
}

</script>

<style scoped>

</style>