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
                  <p class="mt-1 text-sm text-gray-500">Controller-wide settings that impact operation</p>
                </div>

<!--                &lt;!&ndash; LargeTFT &ndash;&gt;-->
<!--                &lt;!&ndash; TODO - hide this if using an IIC display &ndash;&gt;-->
<!--                <SwitchGroup as="div" class="flex items-center my-3">-->
<!--                  <Switch v-model="largeTFT" :class="[largeTFT ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">-->
<!--                    <span aria-hidden="true" :class="[largeTFT ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />-->
<!--                  </Switch>-->
<!--                  <SwitchLabel as="span" class="ml-3">-->
<!--                    <span class="text-sm font-medium text-gray-900">Large TFT Mode</span>-->
<!--                    <span class="text-sm text-gray-500 mx-1">Expands size of the TFT (for 240x320 TFTs)</span>-->
<!--                  </SwitchLabel>-->
<!--                </SwitchGroup>-->

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

              <div>
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900 mt-4">Minimum Times</h3>
                  <p class="mt-1 text-sm text-gray-500">Temperature control compressor/heater protection delays</p>
                </div>

                <Listbox as="div" v-model="selectedSettingSet">
                  <ListboxLabel class="sr-only">Minimum Times Set</ListboxLabel>
                  <div class="relative">
                    <div class="inline-flex divide-x divide-indigo-700 rounded-md shadow-sm">
                      <div class="inline-flex items-center gap-x-1.5 rounded-l-md bg-indigo-600 py-2 px-3 text-white shadow-sm">
                        <CheckIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
                        <p class="text-sm font-semibold">{{ selectedSettingSet.title }}</p>
                      </div>
                      <ListboxButton class="inline-flex items-center rounded-l-none rounded-r-md bg-indigo-600 p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-gray-50">
                        <span class="sr-only">Change time set</span>
                        <ChevronDownIcon class="h-5 w-5 text-white" aria-hidden="true" />
                      </ListboxButton>
                    </div>

                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                      <ListboxOptions class="absolute z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <ListboxOption as="template" v-for="option in minimumTimesSets" :key="option.title" :value="option" v-slot="{ active, selected }">
                          <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'cursor-default select-none p-4 text-sm']">
                            <div class="flex flex-col">
                              <div class="flex justify-between">
                                <p :class="selected ? 'font-semibold' : 'font-normal'">{{ option.title }}</p>
                                <span v-if="selected" :class="active ? 'text-white' : 'text-indigo-600'">
                                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                              </div>
                              <p :class="[active ? 'text-indigo-200' : 'text-gray-500', 'mt-2']">{{ option.description }}</p>
                            </div>
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </transition>

                  </div>
                </Listbox>

                <div class="rounded-md bg-yellow-50 p-4" v-if="selectedSettingSet.value === 1">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-yellow-800">Warning</h3>
                      <div class="mt-2 text-sm text-yellow-700">
                        <p>Selecting "Low Delay" mode substantially reduces the delay in activating cooling, and may damage compressor-based cooling systems like refrigerators. If you are not confident that your setup will not be damaged, please do not select this mode.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="rounded-md bg-yellow-50 p-4" v-else-if="selectedSettingSet.value === 2">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-yellow-800">Warning</h3>
                      <div class="mt-2 text-sm text-yellow-700">
                        <p>The default minimum times are intended to help prevent damage to your heating/cooling systems. Reducing the delays may damage compressor-based cooling systems like refrigerators. Please do not select this mode unless you are confident taking the risk that your settings will not result in damage to your equipment.</p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>

            <div v-if="selectedSettingSet.value === 2">
              <!-- MIN_COOL_OFF_TIME -->
              <div class="mb-3">
                <label for="min-cool-off" class="block text-sm font-medium leading-6 text-gray-900">Min Cool Off Time</label>
                <div class="mt-2">
                  <input type="number" name="min-cool-off" id="min-cool-off" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                         v-model="MIN_COOL_OFF_TIME" aria-describedby="min-cool-off-description" />
                </div>
                <p class="mt-2 text-sm text-gray-500" id="min-cool-off-description">Minimum amount of time (in seconds) that the cooling must remain off before turning on again</p>
              </div>

              <!-- MIN_HEAT_OFF_TIME -->
              <div class="mb-3">
                <label for="min-heat-off" class="block text-sm font-medium leading-6 text-gray-900">Min Heat Off Time</label>
                <div class="mt-2">
                  <input type="number" name="min-heat-off" id="min-heat-off" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                         v-model="MIN_HEAT_OFF_TIME" aria-describedby="min-heat-off-description" />
                </div>
                <p class="mt-2 text-sm text-gray-500" id="min-heat-off-description">Minimum amount of time (in seconds) that the heating must remain off before turning on again</p>
              </div>

              <!-- MIN_COOL_ON_TIME -->
              <div class="mb-3">
                <label for="min-cool-on" class="block text-sm font-medium leading-6 text-gray-900">Min Cool On Time</label>
                <div class="mt-2">
                  <input type="number" name="min-cool-on" id="min-cool-on" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                         v-model="MIN_COOL_ON_TIME" aria-describedby="min-cool-on-description" />
                </div>
                <p class="mt-2 text-sm text-gray-500" id="min-cool-on-description">Minimum amount of time (in seconds) that the cooling must remain on before turning on again</p>
              </div>

              <!-- MIN_HEAT_ON_TIME -->
              <div class="mb-3">
                <label for="min-heat-on" class="block text-sm font-medium leading-6 text-gray-900">Min Heat On Time</label>
                <div class="mt-2">
                  <input type="number" name="min-heat-on" id="min-heat-on" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                         v-model="MIN_HEAT_ON_TIME" aria-describedby="min-heat-on-description" />
                </div>
                <p class="mt-2 text-sm text-gray-500" id="min-heat-on-description">Minimum amount of time (in seconds) that the heating must remain on before turning on again</p>
              </div>

              <!-- MIN_COOL_OFF_TIME_FRIDGE_CONSTANT -->
              <div class="mb-3">
                <label for="min-cool-off-fridge-constant" class="block text-sm font-medium leading-6 text-gray-900">Min Cool Off Time (Fridge Constant Mode)</label>
                <div class="mt-2">
                  <input type="number" name="min-cool-off-fridge-constant" id="min-cool-off-fridge-constant" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                         v-model="MIN_COOL_OFF_TIME_FRIDGE_CONSTANT" aria-describedby="min-cool-off-fridge-constant-description" />
                </div>
                <p class="mt-2 text-sm text-gray-500" id="min-cool-off-fridge-constant-description">Minimum amount of time (in seconds) that the cooling must remain off before turning on again when in "fridge constant" mode</p>
              </div>

              <!-- MIN_SWITCH_TIME -->
              <div class="mb-3">
                <label for="min-switch-time" class="block text-sm font-medium leading-6 text-gray-900">Min Switch Time</label>
                <div class="mt-2">
                  <input type="number" name="min-switch-time" id="min-switch-time" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                         v-model="MIN_SWITCH_TIME" aria-describedby="min-switch-time-description" />
                </div>
                <p class="mt-2 text-sm text-gray-500" id="min-switch-time-description">Minimum amount of time (in seconds) to wait before switching from heating to cooling (or vice versa)</p>
              </div>

              <!-- COOL_PEAK_DETECT_TIME -->
              <div class="mb-3">
                <label for="cool-peak-detect-time" class="block text-sm font-medium leading-6 text-gray-900">Cool Peak Detect Time</label>
                <div class="mt-2">
                  <input type="number" name="cool-peak-detect-time" id="cool-peak-detect-time" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                         v-model="COOL_PEAK_DETECT_TIME" aria-describedby="cool-peak-detect-time-description" />
                </div>
                <p class="mt-2 text-sm text-gray-500" id="cool-peak-detect-time-description">Maximum amount of time (in seconds) to wait while attempting to detect the "peak" temperature while cooling</p>
              </div>

              <!-- HEAT_PEAK_DETECT_TIME -->
              <div class="mb-3">
                <label for="heat-peak-detect-time" class="block text-sm font-medium leading-6 text-gray-900">Heat Peak Detect Time</label>
                <div class="mt-2">
                  <input type="number" name="heat-peak-detect-time" id="heat-peak-detect-time" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                         v-model="HEAT_PEAK_DETECT_TIME" aria-describedby="heat-peak-detect-time-description" />
                </div>
                <p class="mt-2 text-sm text-gray-500" id="heat-peak-detect-time-description">Maximum amount of time (in seconds) to wait while attempting to detect the "peak" temperature while heating</p>
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
import { Switch, SwitchGroup, SwitchLabel, Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from "@headlessui/vue";
import { CheckIcon, ChevronDownIcon, ExclamationTriangleIcon } from '@heroicons/vue/20/solid'

const minimumTimesSets = [
  { title: 'Defaults', description: 'Default times, intended for compressor-based cooling', current: true, value: 0 },
  { title: 'Low Delay', description: '"Low Delay" mode, intended for non-compressor-based cooling', current: false, value: 1 },
  { title: 'Custom Times', description: 'Custom, user-defined delays', current: false, value: 2 },
]

export default {
  name: "ExtendedSettings",
  components: {
    SwitchLabel,
    Switch,
    SwitchGroup,
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    CheckIcon,
    ChevronDownIcon,
    ExclamationTriangleIcon
  },
  setup() {
    return {
      ExtendedSettingsStore: useExtendedSettingsStore(),  // Updated in ExtendedSettings.vue
      minimumTimesSets,
    }
  },
  data() {
    return {
      largeTFT: false,
      glycol: false,
      invertTFT: false,

      SETTINGS_CHOICE: 0,
      MIN_COOL_OFF_TIME: 0,
      MIN_HEAT_OFF_TIME: 0,
      MIN_COOL_ON_TIME: 0,
      MIN_HEAT_ON_TIME: 0,
      MIN_COOL_OFF_TIME_FRIDGE_CONSTANT: 0,
      MIN_SWITCH_TIME: 0,
      COOL_PEAK_DETECT_TIME: 0,
      HEAT_PEAK_DETECT_TIME: 0,
      selectedSettingSet: minimumTimesSets[0],
    }
  },
  mounted() {
    // Retrieve initial data
    this.ExtendedSettingsStore.getExtendedSettings().then(() => {
      this.updateCachedSettings();
    });
  },
  methods: {
    submitForm: function() {
      // Validate the information in the form
      // Nothing needed here for now, as the form is just switches

      let loader = this.$loading.show({});
      this.ExtendedSettingsStore.setExtendedSettings(this.glycol, this.largeTFT, this.invertTFT, this.selectedSettingSet.value, this.MIN_COOL_OFF_TIME, this.MIN_HEAT_OFF_TIME, this.MIN_COOL_ON_TIME, this.MIN_HEAT_ON_TIME,
          this.MIN_COOL_OFF_TIME_FRIDGE_CONSTANT, this.MIN_SWITCH_TIME, this.COOL_PEAK_DETECT_TIME, this.HEAT_PEAK_DETECT_TIME).then(() => {
        this.updateCachedSettings();
        loader.hide();
        // this.updateSuccessful = res.ok;
        // this.alertOpen = true;
      });

    },
    updateCachedSettings: function() {
      this.largeTFT = this.ExtendedSettingsStore.largeTFT;
      this.invertTFT = this.ExtendedSettingsStore.invertTFT;
      this.glycol = this.ExtendedSettingsStore.glycol;

      this.SETTINGS_CHOICE = this.ExtendedSettingsStore.SETTINGS_CHOICE;
      this.MIN_COOL_OFF_TIME = this.ExtendedSettingsStore.MIN_COOL_OFF_TIME;
      this.MIN_HEAT_OFF_TIME = this.ExtendedSettingsStore.MIN_HEAT_OFF_TIME;
      this.MIN_COOL_ON_TIME = this.ExtendedSettingsStore.MIN_COOL_ON_TIME;
      this.MIN_HEAT_ON_TIME = this.ExtendedSettingsStore.MIN_HEAT_ON_TIME;
      this.MIN_COOL_OFF_TIME_FRIDGE_CONSTANT = this.ExtendedSettingsStore.MIN_COOL_OFF_TIME_FRIDGE_CONSTANT;
      this.MIN_SWITCH_TIME = this.ExtendedSettingsStore.MIN_SWITCH_TIME;
      this.COOL_PEAK_DETECT_TIME = this.ExtendedSettingsStore.COOL_PEAK_DETECT_TIME;
      this.HEAT_PEAK_DETECT_TIME = this.ExtendedSettingsStore.HEAT_PEAK_DETECT_TIME;
      this.selectedSettingSet = minimumTimesSets[this.ExtendedSettingsStore.SETTINGS_CHOICE];
    }

  }
}
</script>

<style scoped>

</style>