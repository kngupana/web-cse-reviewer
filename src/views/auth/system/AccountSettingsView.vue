<script setup>
import SideNavigation from '@/components/layout/SideNavigation.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
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

const saveSettings = () => {
  if (form.value.newPassword !== form.value.confirmPassword) {
    alert('Passwords do not match!')
    return
  }
  console.log('Saving...', form.value)
  alert('Settings saved successfully!')
}

const { mobile } = useDisplay()
const isDrawerVisible = ref(mobile.value ? false : true)
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible" />
    </template>

    <template #content>
      <!-- Vibrant purple background -->
      <div class="purple-background ">
        <v-container class="py-8" max-width="700px">
          <v-card class="pa-8 rounded-xl elevation-4 account-card" style="background: rgba(255, 255, 255, 0.96);">

            <!-- Header with gradient icon -->
            <div class="d-flex align-center mb-6 ">
              <div class="icon-gradient-bg mr-4 ">
                <v-icon icon="mdi-account-cog" size="32" color="white"></v-icon>
              </div>
              <div>
                <v-card-title class="text-h5 font-weight-bold pa-0 text-deep-purple-darken-4">
                  Account Settings
                </v-card-title>
                <v-card-subtitle class="pa-0 text-deep-purple-darken-1">
                  Manage your profile information
                </v-card-subtitle>
              </div>
            </div>

            <v-divider class="mb-8" color="deep-purple-lighten-4"></v-divider>

            <!-- Form with colorful icons -->
            <v-form>
              <v-card-text class="pa-0">
                <h3 class="text-h6 font-weight-medium mb-4 text-deep-purple-darken-3">
                  <v-icon icon="mdi-account-details" color="#4CAF50" class="mr-2"></v-icon>
                  Personal Information
                </h3>

                <v-text-field
                  label="Full Name"
                  v-model="form.fullName"
                  :rules="[requiredValidator]"
                  variant="outlined"
                  class="mb-4"
                  color="deep-purple-darken-2"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="#FF5722" class="mr-2">mdi-account-outline</v-icon>
                  </template>
                </v-text-field>

                <v-text-field
                  label="Email Address"
                  v-model="form.email"
                  :rules="[requiredValidator, emailValidator]"
                  variant="outlined"
                  class="mb-6"
                  color="deep-purple-darken-2"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="#2196F3" class="mr-2">mdi-email-outline</v-icon>
                  </template>
                </v-text-field>

                <h3 class="text-h6 font-weight-medium mb-4 text-deep-purple-darken-3">
                  <v-icon icon="mdi-shield-account" color="#9C27B0" class="mr-2"></v-icon>
                  Security Settings
                </h3>

                <v-text-field
                  label="New Password"
                  v-model="form.newPassword"
                  type="password"
                  variant="outlined"
                  class="mb-4"
                  color="deep-purple-darken-2"
                  hint="Leave blank to keep current password"
                  persistent-hint
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="#FF9800" class="mr-2">mdi-lock-outline</v-icon>
                  </template>
                </v-text-field>

                <v-text-field
                  label="Confirm New Password"
                  v-model="form.confirmPassword"
                  type="password"
                  variant="outlined"
                  class="mb-6"
                  color="deep-purple-darken-2"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="#00BCD4" class="mr-2">mdi-lock-check-outline</v-icon>
                  </template>
                </v-text-field>

                <div class="d-flex justify-end">
                  <v-btn
                    color="deep-purple-darken-2"
                    size="large"
                    class="px-6 text-white save-btn"
                    @click="saveSettings"
                    append-icon="mdi-content-save"
                  >
                    Save Changes
                  </v-btn>
                </div>
              </v-card-text>
            </v-form>
          </v-card>
        </v-container>
      </div>
    </template>
  </AppLayout>
</template>

<style scoped>
/* Bold purple background */
.purple-background {
  background: linear-gradient(135deg, #7b1fa2 0%, #4a148c 100%);
  min-height: 100vh;
  padding: 20px 0;
}

/* Gradient icon background */
.icon-gradient-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(45deg, #9C27B0, #673AB7);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Animated save button */
.save-btn {
  transition: all 0.3s ease;
  background: linear-gradient(to right, #7b1fa2, #4a148c);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.save-btn:active {
  transform: translateY(1px);
}

/* Card styling */
.v-card {
  border-radius: 16px;
  transition: transform 0.3s ease;
  overflow: hidden;
}

.v-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f3e5f5;
}
::-webkit-scrollbar-thumb {
  background: #7b1fa2;
  border-radius: 4px;
}
.account-card {
  background-color: rgba(255, 255, 255, 0.96);
  transition: background-color 0.3s ease;
}

/* Vuetify 3 dark mode class */
.v-theme--dark .account-card {
  background-color: rgba(18, 18, 18, 0.96);
}
.v-theme--dark .account-card {
  background-color: black !important;
}


</style>
