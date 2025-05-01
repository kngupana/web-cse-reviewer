<script setup>
import SideNavigation from '@/components/layout/SideNavigation.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
//import { useAuthUserStore } from '@/stores/authUser'
import { requiredValidator, emailValidator } from '@/utils/validators'
import { useDisplay } from 'vuetify'
import { ref } from 'vue'

// Form state
const form = ref({
  fullName: '',
  email: '',
  newPassword: '',
  confirmPassword: '',
})
// Save function
const saveSettings = () => {
  // Basic password match check
  if (form.value.newPassword !== form.value.confirmPassword) {
    alert('Passwords do not match!')
    return
  }

  // Here you would typically call an API to save the updated account info
  console.log('Saving...', form.value)
  alert('Settings saved successfully!')
}

// Utilize pre-defined vue functions
const { mobile } = useDisplay()

// Use Pinia Store
//const authStore = useAuthUserStore()

// Load Variables
const isDrawerVisible = ref(mobile.value ? false : true)
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <!-- Side Navigation -->
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible" />
    </template>

    <!-- Main Content -->
    <template #content>
      <v-container class="py-10" max-width="600px">
        <v-card class="pa-6 elevation-6 rounded-xl bg-blue-grey-lighten-5">
          <v-card-title class="text-xl font-bold text-blue-grey-darken-3 mb-6">
            🧾 Exam Taker Profile
          </v-card-title>

          <v-form>
            <v-text-field
              label="Full Name"
              v-model="form.fullName"
              prepend-inner-icon="mdi-account"
              :rules="[requiredValidator]"
              class="mb-4"
            />

            <v-text-field
              label="Email Address"
              v-model="form.email"
              prepend-inner-icon="mdi-email"
              :rules="[requiredValidator, emailValidator]"
              class="mb-4"
            />

            <v-text-field
              label="New Password"
              v-model="form.newPassword"
              prepend-inner-icon="mdi-lock-outline"
              type="password"
              class="mb-4"
            />

            <v-text-field
              label="Confirm New Password"
              v-model="form.confirmPassword"
              prepend-inner-icon="mdi-lock-check-outline"
              type="password"
              class="mb-6"
            />

            <v-btn color="indigo-darken-3" block class="py-3 text-white" @click="saveSettings">
              💾 Save Profile Changes
            </v-btn>
          </v-form>
        </v-card>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.text-blue-grey-darken-3 {
  color: #37474f;
}
.bg-blue-grey-lighten-5 {
  background-color: #eceff1;
}
</style>
