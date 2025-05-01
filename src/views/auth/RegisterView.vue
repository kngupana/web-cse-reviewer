<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import RegisterForm from '@/components/auth/RegisterForm.vue'

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <!-- Two-column layout with right-aligned form -->
      <v-row
        class="d-flex align-center"
        style="
          min-height: 100vh;
          padding: 16px;
          background: url('images/csc.jpg') no-repeat 100% center;
          background-size: cover;
        "
      >
        <!-- Optional left column (hidden on mobile) -->
        <v-col cols="12" md="7" class="d-none d-md-block">
          <!-- You can add illustration or leave this empty -->
        </v-col>

        <!-- Form on the right -->
        <v-col cols="12" md="5" class="d-flex justify-end">
          <v-card
            class="rounded-xl"
            elevation="16"
            style="
              background: rgba(255, 255, 255, 0.92);
              backdrop-filter: blur(10px);
              padding: 24px;
              max-width: 420px;
              width: 100%;
              margin-right: 0;
            "
          >
            <v-card-title class="text-center pb-2">
              <v-img class="mx-auto mb-3" src="images/logo.jpg" :width="mobile ? '70%' : '40%'" />
              <h3 class="font-weight-bold text-primary mb-1">CSE Reviewer</h3>
              <p class="font-weight-medium text-grey-darken-1">Registration Form</p>
            </v-card-title>

            <RegisterForm />

            <v-card-text class="pt-4">
              <v-divider class="my-5" />
              <h5 class="text-center text-grey-darken-2">
                Already have an account?
                <RouterLink to="/" class="font-weight-bold text-purple-darken-3 hover:underline">
                  Click here to Login
                </RouterLink>
              </h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
