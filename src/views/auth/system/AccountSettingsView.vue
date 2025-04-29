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
    <!-- Navigation Slot -->
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible" />
    </template>

    <!-- Content Slot -->
    <template #content>
      <v-container class="py-10" max-width="500px">
        <v-card elevation="10" class="pa-6 rounded-xl">
          <v-card-title class="text-h5 font-weight-bold mb-6">Account Settings</v-card-title>

          <v-form>
            <v-text-field
              label="Full Name"
              v-model="form.fullName"
              prepend-inner-icon="mdi-account"
              :rules="[requiredValidator]"
            />

            <v-text-field
              label="Email"
              v-model="form.email"
              prepend-inner-icon="mdi-email"
              :rules="[requiredValidator, emailValidator]"
            />

            <v-text-field
              label="New Password"
              v-model="form.newPassword"
              prepend-inner-icon="mdi-lock"
              type="password"
            />

            <v-text-field
              label="Confirm New Password"
              v-model="form.confirmPassword"
              prepend-inner-icon="mdi-lock"
              type="password"
            />

            <v-btn color="purple-darken-3" class="mt-4" block @click="saveSettings">
              Save Changes
            </v-btn>
          </v-form>
        </v-card>
      </v-container>
    </template>
  </AppLayout>
</template>


