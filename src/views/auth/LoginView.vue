<script setup>
import { ref } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import LoginForm from '@/components/auth/LoginForm.vue'

const { mobile } = useDisplay()
const isLoading = ref(false)
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row
        class="d-flex align-center"
        style="
          min-height: 100vh;
          padding: 16px;
          background: url('images/csc.jpg') no-repeat 100% center;
          background-size: cover;
        "
      >
        <!-- Left spacer or background (optional) -->
        <v-col cols="12" md="7" class="d-none d-md-block">
          <!-- Background image or illustration can go here -->
        </v-col>

        <!-- Right-aligned login form -->
        <v-col cols="12" md="5" class="d-flex justify-end">
          <v-card
            class="rounded-xl"
            elevation="20"
            style="
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              padding: 24px;
              max-width: 420px;
              width: 100%;
            "
          >
            <v-card-title class="text-center pb-2">
              <v-img class="mx-auto mb-3" src="images/logo.jpg" :width="mobile ? '70%' : '40%'" />
              <h3 class="font-weight-bold text-primary mb-1">CSE Reviewer</h3>
              <p class="font-weight-medium text-grey-darken-1">Login Form</p>
            </v-card-title>

            <v-card-text>
              <v-divider class="my-5" />
              <LoginForm @update:loading="isLoading = $event" />
              <v-divider class="my-5" />
              <h5 class="text-center text-grey-darken-2">
                Don't have an account?
                <RouterLink
                  to="/register"
                  class="font-weight-bold text-purple-darken-3 hover:underline"
                >
                  Click here to Register
                </RouterLink>
              </h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Global loading overlay -->
      <v-overlay :model-value="isLoading" persistent class="d-flex align-center justify-center">
        <v-progress-circular indeterminate size="64" color="deep-purple-darken-3" />
      </v-overlay>
    </template>
  </AppLayout>
</template>

<style scoped>
.v-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.18);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.text-primary {
  color: #3f51b5;
}

.hover\:underline:hover {
  text-decoration: underline;
}
</style>
