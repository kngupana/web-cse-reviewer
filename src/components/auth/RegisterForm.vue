<script setup>
import { ref } from 'vue'

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const password = ref('')

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const submitForm = () => {
  // Add form handling logic here
  console.log('Form submitted')
}
</script>

<template>
  <v-container class="py-6" max-width="500px">
    <v-card elevation="10" class="pa-6 rounded-xl">
      <v-card-title class="text-h5 font-weight-bold text-center pb-4">
        Create an Account
      </v-card-title>

      <v-form fast-fail @submit.prevent="submitForm">
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-text-field
              label="First Name"
              variant="outlined"
              prepend-icon="mdi-account"
              required
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Last Name"
              variant="outlined"
              prepend-icon="mdi-account"
              required
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="Email"
              variant="outlined"
              prepend-icon="mdi-email"
              type="email"
              required
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              variant="outlined"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="togglePassword"
              required
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              :type="showConfirmPassword ? 'text' : 'password'"
              label="Confirm Password"
              variant="outlined"
              prepend-icon="mdi-lock-check"
              :append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="toggleConfirmPassword"
              required
            />
          </v-col>
        </v-row>
        <v-checkbox
          v-model="acceptTerms"
          label="I accept the Terms and Conditions"
          :rules="[(v) => !!v || 'You must accept the terms']"
          required
        />

        <v-btn
          class="mt-4"
          type="submit"
          block
          color="purple-darken-3"
          prepend-icon="mdi-account-plus"
        >
          Register
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
