<script setup>
import { ref } from 'vue'

const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = () => {
  // Your login logic goes here
  console.log('Logging in...')
}
</script>

<template>
  <v-container class="py-10" max-width="450px">
    <v-card elevation="10" class="pa-6 rounded-xl">
      <v-card-title class="text-h5 font-weight-bold text-center mb-4"> Welcome Back </v-card-title>

      <v-form fast-fail @submit.prevent="handleLogin">
        <v-text-field
          label="Email Address"
          prepend-icon="mdi-email"
          type="email"
          variant="outlined"
          density="comfortable"
          required
        />

        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="togglePassword"
          variant="outlined"
          density="comfortable"
          required
        />

        <v-btn type="submit" block color="purple-darken-3" class="mt-4" prepend-icon="mdi-login">
          Login
        </v-btn>
        <div class="text-right">
          <a href="#" class="forgot-password">Forgot password?</a>
        </div>
      </v-form>

      <v-divider class="my-4" />
    </v-card>
  </v-container>
</template>
