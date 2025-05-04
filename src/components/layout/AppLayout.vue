<script setup>
import { isAuthenticated } from '@/utils/supabase'
import { onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import ProfileHeader from '@/components/layout/ProfileHeader.vue'
//import UploadReviewerView from '@/views/auth/system/UploadReviewerView.vue'
//import { RouterLink } from 'vue-router'

const props = defineProps(['isWithAppBarNavIcon'])
const emit = defineEmits(['isDrawerVisible'])

const { mobile } = useDisplay()
const theme = ref(localStorage.getItem('theme') ?? 'light')
const isDrawerVisible = ref(false)

// Authentication status

const isLoggedIn = ref(false)

// Toggle Theme
function onToggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}

// Toggle drawer
function toggleDrawer() {
  isDrawerVisible.value = !isDrawerVisible.value
  emit('isDrawerVisible', isDrawerVisible.value)
}

// Get Authentication status from Supabase
const getLoggedStatus = async () => {
  isLoggedIn.value = await isAuthenticated()
}

// Load functions during component rendering
onMounted(() => {
  getLoggedStatus()
})
</script>

<template>
  <v-app :theme="theme">
    <!-- Conditionally Render Side Navigation based on Login Status and Route -->
    <SideNavigation
      v-if="isLoggedIn && !['/login', '/register'].includes($route.path)"
      :is-drawer-visible="isDrawerVisible"
    />

    <!-- App Bar -->
    <v-app-bar
      class="px-4"
      :style="{ backgroundColor: theme === 'light' ? '#A084E8' : '#4B0082' }"
      border
    >
      <!-- App Bar Nav Icon (Hamburger Menu) -->
      <v-app-bar-nav-icon
        v-if="props.isWithAppBarNavIcon"
        :icon="isDrawerVisible ? 'mdi-close' : 'mdi-menu'"
        :theme="theme"
        @click="toggleDrawer"
      ></v-app-bar-nav-icon>

      <!-- Spacer to push content to the right -->
      <v-spacer></v-spacer>

      <!-- Profile Header (Visible if logged in and on large screens) -->
      <ProfileHeader v-if="isLoggedIn && !mobile" class="mr-4" />

      <!-- Dark/Light Mode Toggle Button -->
      <v-btn
        :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        variant="text"
        @click="onToggleTheme"
      ></v-btn>
    </v-app-bar>

    <!-- Main Content Area -->
    <v-main>
      <slot name="content"></slot>
    </v-main>

    <!-- Footer -->
    <v-footer
      class="font-weight-bold"
      :style="{ backgroundColor: theme === 'light' ? '#A084E8' : '#4B0082' }"
      elevation="24"
      border
      app
    >
      Copyright © 2025 - CSE REVIEWER | All Rights Reserved
    </v-footer>
  </v-app>
</template>

<style scoped>
/* Improved spacing for app bar elements */
.v-app-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .v-app-bar {
    padding-right: 16px;
  }
}
</style>
