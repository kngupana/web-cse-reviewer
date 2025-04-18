<script setup>
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
import { ref } from 'vue'

const formDataDefault = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: '',
}

const formData = ref({
  ...formDataDefault,
})
const onSubmit = () => {
  alert(formData.value.email)
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}

const isPasswordVisible = ref(false)
const isPasswordConfirmVisible = ref(false)
const refVForm = ref()

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const toggleConfirmPassword = () => {
  isPasswordConfirmVisible.value = !isPasswordConfirmVisible.value
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

      <v-form ref="refVForm" @submit.prevent="onFormSubmit">
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData.firstname"
              label="First Name"
              variant="outlined"
              prepend-icon="mdi-account"
              required
              :rules="[requiredValidator]"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData.lastname"
              label="Last Name"
              variant="outlined"
              prepend-icon="mdi-account"
              required
              :rules="[requiredValidator]"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="formData.email"
              label="Email"
              variant="outlined"
              prepend-icon="mdi-email"
              type="email"
              required
              :rules="[requiredValidator, emailValidator]"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              variant="outlined"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="togglePassword"
              required
              :rules="[requiredValidator, passwordValidator]"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="formData.password_confirmation"
              :type="showConfirmPassword ? 'text' : 'password'"
              label="Confirm Password"
              variant="outlined"
              prepend-icon="mdi-lock-check"
              :append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="toggleConfirmPassword"
              required
              :rules="[
                requiredValidator,
                confirmedValidator(formData.password_confirmation, formData.password),
              ]"
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
