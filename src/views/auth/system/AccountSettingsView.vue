<script setup>
import SideNavigation from '@/components/layout/SideNavigation.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { requiredValidator, emailValidator } from '@/utils/validators'
import { useDisplay } from 'vuetify'
import { ref } from 'vue'

const form = ref({
  fullName: '',
  email: '',
  newPassword: '',
  confirmPassword: '',
})

const saveSettings = () => {
  if (form.value.newPassword !== form.value.confirmPassword) {
    alert('❌ Passwords do not match.')
    return
  }

  console.log('Saving...', form.value)
  alert('✅ Profile saved successfully!')
}

const { mobile } = useDisplay()
const isDrawerVisible = ref(!mobile.value)
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
      <div class="stylish-bg min-h-screen d-flex align-center justify-center">
        <v-container max-width="650px">
          <v-card class="profile-card elevation-10 pa-8">
            <v-card-title class="text-h4 font-weight-bold text-primary mb-6 text-center">
              📝 Profile Settings
            </v-card-title>

            <v-form>
              <v-text-field
                label="Full Name"
                v-model="form.fullName"
                prepend-inner-icon="mdi-account"
                :rules="[requiredValidator]"
                class="mb-5"
                variant="outlined"
              />

              <v-text-field
                label="Email Address"
                v-model="form.email"
                prepend-inner-icon="mdi-email"
                :rules="[requiredValidator, emailValidator]"
                class="mb-5"
                variant="outlined"
              />

              <v-text-field
                label="New Password"
                v-model="form.newPassword"
                prepend-inner-icon="mdi-lock-outline"
                type="password"
                class="mb-5"
                variant="outlined"
              />

              <v-text-field
                label="Confirm New Password"
                v-model="form.confirmPassword"
                prepend-inner-icon="mdi-lock-check-outline"
                type="password"
                class="mb-7"
                variant="outlined"
              />

              <v-btn color="primary" size="large" block class="text-white" @click="saveSettings">
                💾 Update Profile
              </v-btn>
            </v-form>
          </v-card>
        </v-container>
      </div>
    </template>
  </AppLayout>
</template>

<style scoped>
.stylish-bg {
  background: linear-gradient(135deg, #d4a5f9, #f3e6f5); /* Vibrant gradient */
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.1); /* Enhanced shadow for elevation */
}

.profile-card {
  background-color: #ffffffee;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.profile-card:hover {
  transform: scale(1.01);
}
</style>
