<template>
  <div class="py-6">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <div class="py-4">

        <div>
          <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="submitForm">
            <div class="space-y-8 divide-y divide-gray-200">


              <div v-if="true">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">Minimum Times</h3>
                  <p class="mt-1 text-sm text-gray-500">Temperature control compressor/heater protection delays</p>
                </div>

                <Listbox as="div" v-model="SETTINGS_CHOICE">
                  <ListboxLabel class="sr-only">Minimum Times Set</ListboxLabel>
                  <div class="relative">
                    <div class="inline-flex divide-x divide-indigo-700 rounded-md shadow-sm">
                      <div class="inline-flex items-center gap-x-1.5 rounded-l-md bg-indigo-600 py-2 px-3 text-white shadow-sm">
                        <CheckIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
                        <p class="text-sm font-semibold">{{ minimumTimesSets[0].title }}</p>
                      </div>
                      <ListboxButton class="inline-flex items-center rounded-l-none rounded-r-md bg-indigo-600 p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-gray-50">
                        <span class="sr-only">Change time set</span>
                        <ChevronDownIcon class="h-5 w-5 text-white" aria-hidden="true" />
                      </ListboxButton>
                    </div>

                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                      <ListboxOptions class="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <ListboxOption as="template" v-for="option in minimumTimesSets" :key="option.title" :value="option.value" v-slot="{ active, selected }">
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
import { useMinTimesStore } from "@/stores/MinTimesStore";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'

const minimumTimesSets = [
  { title: 'Defaults', description: 'Default times, intended for compressor-based cooling', current: true, value: 0 },
  { title: 'Low Delay', description: '"Low Delay" mode, intended for non-compressor-based cooling', current: false, value: 1 },
  { title: 'Custom Times', description: 'Custom, user-defined delays', current: false, value: 2 },
]

export default {
  name: "MinTimesPanel",
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
  },
  setup() {
    return {
      MinTimesStore: useMinTimesStore(),  // Updated in MinTimesPanel.vue
      minimumTimesSets,
    }
  },
  data() {
    return {
      SETTINGS_CHOICE: 0,
      MIN_COOL_OFF_TIME: 0,
      MIN_HEAT_OFF_TIME: 0,
      MIN_COOL_ON_TIME: 0,
      MIN_HEAT_ON_TIME: 0,
      MIN_COOL_OFF_TIME_FRIDGE_CONSTANT: 0,
      MIN_SWITCH_TIME: 0,
      COOL_PEAK_DETECT_TIME: 0,
      HEAT_PEAK_DETECT_TIME: 0,
    }
  },
  mounted() {
    // Retrieve initial data
    this.MinTimesStore.getMinTimes().then(() => {
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
      this.MinTimesStore.setMinTimes(this.SETTINGS_CHOICE, this.MIN_COOL_OFF_TIME, this.MIN_HEAT_OFF_TIME, this.MIN_COOL_ON_TIME, this.MIN_HEAT_ON_TIME,
          this.MIN_COOL_OFF_TIME_FRIDGE_CONSTANT, this.MIN_SWITCH_TIME, this.COOL_PEAK_DETECT_TIME, this.HEAT_PEAK_DETECT_TIME).then(() => {
        this.updateCachedSettings();
        loader.hide();
        // this.updateSuccessful = res.ok;
        // this.alertOpen = true;
      });

    },
    updateCachedSettings: function() {
      this.SETTINGS_CHOICE = this.MinTimesStore.SETTINGS_CHOICE;
      this.MIN_COOL_OFF_TIME = this.MinTimesStore.MIN_COOL_OFF_TIME;
      this.MIN_HEAT_OFF_TIME = this.MinTimesStore.MIN_HEAT_OFF_TIME;
      this.MIN_COOL_ON_TIME = this.MinTimesStore.MIN_COOL_ON_TIME;
      this.MIN_HEAT_ON_TIME = this.MinTimesStore.MIN_HEAT_ON_TIME;
      this.MIN_COOL_OFF_TIME_FRIDGE_CONSTANT = this.MinTimesStore.MIN_COOL_OFF_TIME_FRIDGE_CONSTANT;
      this.MIN_SWITCH_TIME = this.MinTimesStore.MIN_SWITCH_TIME;
      this.COOL_PEAK_DETECT_TIME = this.MinTimesStore.COOL_PEAK_DETECT_TIME;
      this.HEAT_PEAK_DETECT_TIME = this.MinTimesStore.HEAT_PEAK_DETECT_TIME;
    }

  }
}
</script>

<style scoped>

</style>