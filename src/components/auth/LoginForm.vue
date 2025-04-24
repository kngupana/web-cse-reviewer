<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase, formActionDefault } from '@/utils/supabase'

// For routing
const router = useRouter()

// Emit to parent
const emit = defineEmits(['update:loading'])

// Default form data
const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({ ...formDataDefault })
const formAction = ref({ ...formActionDefault })
const isPasswordVisible = ref(false)
const refVForm = ref()

// Submit logic
const onSubmit = async () => {
  formAction.value = { ...formActionDefault }

  emit('update:loading', true) // Show loading in parent

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password,
  })

  if (error) {
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    formAction.value.formSuccessMessage = 'Successfully Logged Account'
    router.replace('/dashboard')
  }

  refVForm.value?.reset()
  emit('update:loading', false) // Hide loading
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  />

  <v-container class="py-10" max-width="450px">
    <v-card elevation="10" class="pa-6 rounded-xl">
      <v-card-title class="text-h5 font-weight-bold text-center mb-4">
        Welcome Back
      </v-card-title>

      <v-form class="mt-5" ref="refVForm" @submit.prevent="onFormSubmit">
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

        <v-btn
          type="submit"
          block
          color="purple-darken-3"
          class="mt-4"
          prepend-icon="mdi-login"
        >
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
