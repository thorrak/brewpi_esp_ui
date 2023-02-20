<template>
  <div>
    <div>
      <h3 class="text-lg font-medium leading-6 text-gray-900">LCD Display</h3>
      <LCD :line1="LCDStore.LCDTextLines[0]" :line2="LCDStore.LCDTextLines[1]" :line3="LCDStore.LCDTextLines[2]" :line4="LCDStore.LCDTextLines[3]" />
    </div>
    <TempControlDashPanel />
  </div>

</template>

<script>
import { useLCDStore } from "@/stores/LCDStore";
import { useTempControlStore } from "@/stores/TempControlStore";
import LCD from "@/components/dashboard/LCD.vue";
import { toRef } from 'vue'
import TempControlDashPanel from "@/components/dashboard/TempControlDashPanel.vue";

export default {
  name: "Dashboard",
  components: {
    TempControlDashPanel,
    LCD
  },
  mounted() {
    // Retrieve initial data
    this.LCDStore.getLCD();

    // Set up periodic refreshes
    window.setInterval(() => {
      this.LCDStore.getLCD();
    }, 5000)
  },
  setup() {
    return {
      LCDStore: useLCDStore(),  // Updated in Dashboard.vue
      TempControlStore: useTempControlStore()  // Updated in App.vue
    }
  },

}
</script>

<style scoped>

</style>