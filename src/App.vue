<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 md:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button type="button" class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div class="flex flex-shrink-0 items-center px-4">
                  <img class="h-8 w-auto" src="/fermenttemp_logo.svg" alt="FermentTemp" />
                </div>
                <nav class="mt-5 space-y-1 px-2">
                  <!-- Mobile (small) navigation -->
                  <router-link v-for="item in navigation" :key="item.name" :to="{name: item.route_name}" v-slot="{ href, navigate, isActive }" custom>
                    <a :href="href" :class="[isActive ? 'bg-indigo-800 text-white' : 'text-white hover:bg-indigo-600 hover:bg-opacity-75', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']" @click="navigate">
                      <component :is="item.icon" class="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
                      {{ item.name }}
                    </a>
                  </router-link>
                </nav>
              </div>
<!--              <div class="flex flex-shrink-0 border-t border-indigo-800 p-4">-->
<!--                <a href="#" class="group block flex-shrink-0">-->
<!--                  <div class="flex items-center">-->
<!--                    <div>-->
<!--                      <img class="inline-block h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />-->
<!--                    </div>-->
<!--                    <div class="ml-3">-->
<!--                      <p class="text-base font-medium text-white">Tom Cook</p>-->
<!--                      <p class="text-sm font-medium text-indigo-200 group-hover:text-white">View profile</p>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </a>-->
<!--              </div>-->
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0" aria-hidden="true">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex min-h-0 flex-1 flex-col bg-indigo-700">
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4">
            <img class="h-8 w-auto" src="/fermenttemp_logo.svg" alt="FermentTemp" />
          </div>
          <nav class="mt-5 flex-1 space-y-1 px-2">
            <!-- Desktop (big) sidebar navigation -->
            <router-link v-for="item in navigation" :key="item.name" :to="{name: item.route_name}" v-slot="{ href, navigate, isActive }" custom>
              <a :href="href" :class="[isActive ? 'bg-indigo-800 text-white' : 'text-white hover:bg-indigo-600 hover:bg-opacity-75', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
                <component :is="item.icon" class="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
                {{ item.name }}
              </a>
            </router-link>
          </nav>
        </div>
<!--        <div class="flex flex-shrink-0 border-t border-indigo-800 p-4">-->
<!--          <a href="#" class="group block w-full flex-shrink-0">-->
<!--            <div class="flex items-center">-->
<!--              <div>-->
<!--                <img class="inline-block h-9 w-9 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />-->
<!--              </div>-->
<!--              <div class="ml-3">-->
<!--                <p class="text-sm font-medium text-white">Tom Cook</p>-->
<!--                <p class="text-xs font-medium text-indigo-200 group-hover:text-white">View profile</p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </a>-->
<!--        </div>-->
      </div>
    </div>
    <div class="flex flex-1 flex-col md:pl-64">
      <div class="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
        <button type="button" class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <main class="flex-1">
        <router-view class="us__content"  />
      </main>
    </div>
  </div>
</template>


<script>
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems, TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import {
  Bars3Icon,
  HomeIcon,
  XMarkIcon,
  CloudArrowUpIcon,
  CpuChipIcon,
  LightBulbIcon,
  Cog8ToothIcon
} from '@heroicons/vue/24/outline'
// import fermenttempLogoUrl from "@/assets/fermenttemp_logo.svg";


import { ref, reactive } from "vue";
import { useTempControlStore } from "@/stores/TempControlStore.js";

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, route_name: 'Home' },
  // { name: 'Fermentrack Settings', icon: CloudArrowUpIcon, route_name: 'UpstreamSettings' },
  { name: 'Set Up Sensors/Actuators', icon: CpuChipIcon, route_name: 'ConfigSensorsActuators' },
  { name: 'Controller Settings', icon: Cog8ToothIcon, route_name: 'ExtendedSettings' },
  { name: 'About Controller', icon: LightBulbIcon, route_name: 'About' },
]

export default {
  name: "App",
  components: {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Bars3Icon,
    XMarkIcon,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    CpuChipIcon,
    LightBulbIcon,
    Cog8ToothIcon
  },
  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
      navigation,
      // fermenttempLogoUrl,
      TempControlStore: useTempControlStore()  // Updated in App.vue
    }
  },
  mounted() {
    // Retrieve initial data
    this.TempControlStore.getTempInfo();

    // Set up periodic refreshes
    window.setInterval(() => {
      this.TempControlStore.getTempInfo();
    }, 7000)
  },

}
</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
