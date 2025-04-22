<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const isPasswordVisible = ref(false)
const refVForm = ref()
const router = useRouter()

const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({
  ...formDataDefault,
})

const errorMsg = ref('')  // For displaying login errors

const onSubmit = async () => {
  const { email, password } = formData.value
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    errorMsg.value = error.message
  } else {
    // Redirect to dashboard after successful login
    router.push('/dashboard')  // Ensure you have a route to /dashboard
  }
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <v-container class="py-10" max-width="450px">
    <v-card elevation="10" class="pa-6 rounded-xl">
      <v-card-title class="text-h5 font-weight-bold text-center mb-4"> Welcome Back </v-card-title>

      <v-form ref="refVForm" @submit.prevent="onFormSubmit">
        <v-text-field
          v-model="formData.email"
          label="Email"
          prepend-inner-icon="mdi-email"
          :rules="[requiredValidator, emailValidator]"
        />

        <v-text-field
          v-model="formData.password"
          prepend-inner-icon="mdi-lock"
          label="Password"
          :type="isPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
          :rules="[requiredValidator]"
        />

        <v-btn type="submit" block color="purple-darken-3" class="mt-4" prepend-icon="mdi-login">
          Login
        </v-btn>
        <div class="text-right">
          <a href="#" class="forgot-password">Forgot password?</a>
        </div>

        <p v-if="errorMsg" class="text-red mt-2">{{ errorMsg }}</p>  <!-- Error message display -->
      </v-form>

      <v-divider class="my-4" />
    </v-card>
  </v-container>
</template>
