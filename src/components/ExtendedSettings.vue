<template>
  <div class="py-6">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Controller Settings</h1>
    </div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <div class="py-4">

        <div>
          <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="submitForm">
            <div class="space-y-8 divide-y divide-gray-200">


              <div v-if="ExtendedSettingsStore.hasExtendedSettings">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">Controller Settings</h3>
                  <!-- TODO - Change "Fermentrack" out here if Lee ever adds support for REST controllers to BPR -->
                  <p class="mt-1 text-sm text-gray-500">Controller-wide settings that impact operation</p>
                </div>

                <SwitchGroup as="div" class="flex items-center my-3">
                  <Switch v-model="lowDelay" :class="[lowDelay ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
                    <span aria-hidden="true" :class="[lowDelay ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                  </Switch>
                  <SwitchLabel as="span" class="ml-3">
                    <span class="text-sm font-medium text-gray-900">Low Delay Mode</span>
                    <span class="text-sm text-gray-500 mx-1">(Lowers "waiting to cool/heat" times - do not use with compressor-based cooling)</span>
                  </SwitchLabel>
                </SwitchGroup>

<!--                <SwitchGroup as="div" class="flex items-center my-3">-->
<!--                  <Switch v-model="glycol" :class="[glycol ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">-->
<!--                    <span aria-hidden="true" :class="[glycol ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />-->
<!--                  </Switch>-->
<!--                  <SwitchLabel as="span" class="ml-3">-->
<!--                    <span class="text-sm font-medium text-gray-900">Glycol Mode</span>-->
<!--                    <span class="text-sm text-gray-500 mx-1">(Lowers wait times)</span>-->
<!--                  </SwitchLabel>-->
<!--                </SwitchGroup>-->

                <!-- InvertTFT -->
                <!-- TODO - hide this if using an IIC display -->
                <SwitchGroup as="div" class="flex items-center my-3">
                  <Switch v-model="invertTFT" :class="[invertTFT ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
                    <span aria-hidden="true" :class="[invertTFT ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                  </Switch>
                  <SwitchLabel as="span" class="ml-3">
                    <span class="text-sm font-medium text-gray-900">Rotate TFT</span>
                    <span class="text-sm text-gray-500 mx-1">(Rotates a TFT display if it is currently upside-down)</span>
                  </SwitchLabel>
                </SwitchGroup>

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
import { useExtendedSettingsStore } from "@/stores/ExtendedSettingsStore";
import {Switch, SwitchGroup, SwitchLabel} from "@headlessui/vue";

export default {
  name: "ExtendedSettings",
  components: {SwitchLabel, Switch, SwitchGroup},
  setup() {
    return {
      ExtendedSettingsStore: useExtendedSettingsStore()  // Updated in ExtendedSettings.vue
    }
  },
  data() {
    return {
      lowDelay: false,
      glycol: false,
      invertTFT: false
    }
  },
  mounted() {
    // Retrieve initial data
    this.ExtendedSettingsStore.getExtendedSettings().then(() => {
      this.updateCachedSettings();
    });

    // Set up periodic refreshes
    // window.setInterval(() => {
    //   this.ExtendedSettingsStore.getExtendedSettings();
    // }, 30000)  // Do we really want to update this? Probably not.
  },
  methods: {
    submitForm: function() {
      // Validate the information in the form
      // Nothing needed here for now, as the form is just switches

      let loader = this.$loading.show({});
      this.ExtendedSettingsStore.setExtendedSettings(this.glycol, this.lowDelay, this.invertTFT).then(() => {
        this.updateCachedSettings();
        loader.hide();
        // this.updateSuccessful = res.ok;
        // this.alertOpen = true;
      });

    },
    updateCachedSettings: function() {
      this.lowDelay = this.ExtendedSettingsStore.lowDelay;
      this.invertTFT = this.ExtendedSettingsStore.invertTFT;
      this.glycol = this.ExtendedSettingsStore.glycol;
    }

  }
}
</script>

<style scoped>

</style>