<template>
  <div>
    <h3 class="text-lg font-medium leading-6 text-gray-900">Current Temps</h3>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">Fridge Temp</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-if="TempControlStore.hasTempInfo"><span v-html="formatTemp(TempControlStore.fridgeTemp)"></span></dd>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-else>0&deg; --</dd>
      </div>
      <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">Beer Temp</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-if="TempControlStore.hasTempInfo"><span v-html="formatTemp(TempControlStore.tempInfo.BeerTemp)"></span></dd>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-else>0&deg; --</dd>
      </div>
      <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">Room Temp</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-if="TempControlStore.hasTempInfo"><span v-html="formatTemp(TempControlStore.roomTemp)"></span></dd>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-else>0&deg; --</dd>
      </div>
      <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">Control Mode</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-if="TempControlStore.hasTempInfo">XXX</dd>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-else>--</dd>
      </div>
      <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">Control Status</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-if="TempControlStore.hasTempInfo">XXX</dd>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900" v-else>--</dd>
      </div>
    </dl>
  </div>
</template>

<script>
import { useTempControlStore } from "@/stores/TempControlStore";

export default {
  name: "TempControlDashPanel",
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