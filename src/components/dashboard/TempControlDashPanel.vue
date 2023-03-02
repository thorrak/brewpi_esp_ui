<template>
  <div>
    <h3 class="text-lg font-medium leading-6 text-gray-900">Current Temps</h3>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">Fridge Temp</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-if="TempControlStore.hasTempInfo">
          <span v-html="formatTemp(TempControlStore.fridgeTemp)"></span>
        </dd>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-else>--&deg; --</dd>
      </div>
      <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">Beer Temp</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-if="TempControlStore.hasTempInfo"><span v-html="formatTemp(TempControlStore.beerTemp)"></span></dd>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-else>--&deg; --</dd>
      </div>
      <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">Room Temp</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-if="TempControlStore.hasTempInfo"><span v-html="formatTemp(TempControlStore.roomTemp)"></span></dd>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-else>--&deg; --</dd>
      </div>
      <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">Control Mode</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900 flex items-baseline justify-between md:block lg:flex" v-if="TempControlStore.hasTempInfo">
          <span v-if="TempControlStore.controlMode === 'f'" class="flex items-baseline">Fridge Constant</span>
          <span v-else-if="TempControlStore.controlMode === 'b'">Beer Constant</span>
          <span v-else-if="TempControlStore.controlMode === 'p'">Beer Profile</span>
          <span v-else-if="TempControlStore.controlMode === 'o'">Off</span>
          <span v-else-if="TempControlStore.controlMode === 't'">Test Mode</span>
          <div class=" text-green-800 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
<!--            <InformationCircleIcon class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />-->
<!--            Change Mode-->
            <ModeChangeModal />
          </div>
        </dd>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-else>--</dd>
      </div>
      <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">Control Status</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-if="TempControlStore.hasTempInfo">
          <span v-if="TempControlStore.controlState === 0">Idle</span>
          <span v-else-if="TempControlStore.controlState === 1">Off</span>
          <span v-else-if="TempControlStore.controlState === 2">Door Open</span>
          <span v-else-if="TempControlStore.controlState === 3">Heating</span>
          <span v-else-if="TempControlStore.controlState === 4">Cooling</span>
          <span v-else-if="TempControlStore.controlState === 5">Waiting to Cool</span>
          <span v-else-if="TempControlStore.controlState === 6">Waiting to Heat</span>
          <span v-else-if="TempControlStore.controlState === 7">Waiting for Peak</span>
          <span v-else-if="TempControlStore.controlState === 8">Min. Cool Time</span>
          <span v-else-if="TempControlStore.controlState === 9">Min. Heat Time</span>
        </dd>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-else>--</dd>
      </div>
    </dl>
  </div>
</template>

<script>
import { useTempControlStore } from "@/stores/TempControlStore";
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import ModeChangeModal from "@/components/dashboard/ModeChangeModal.vue";

export default {
  name: "TempControlDashPanel",
  components: {
    ModeChangeModal,
    ExclamationTriangleIcon,
    InformationCircleIcon
  },
  setup() {
    return {
      TempControlStore: useTempControlStore()
    }
  },
  methods: {
    formatTemp(temp) {
      const temp_num = Number.parseFloat(temp);
      if(isNaN(temp_num)) return "--" + "&deg; " + this.TempControlStore.cc.tempFormat;
      return temp_num.toFixed(1) + "&deg; " + this.TempControlStore.cc.tempFormat;
    },
  },
}
</script>

<style scoped>

</style>