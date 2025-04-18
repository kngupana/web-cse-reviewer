<script setup>
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
import { ref } from 'vue'
import { supabase, formActionDefault } from '@/utils/supabase.js'
import AlertNotification from '@/components/common/AlertNotification.vue'

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

const formAction = ref({ ...formActionDefault })

const isPasswordVisible = ref(false)
const isPasswordConfirmVisible = ref(false)
const refVForm = ref()

const onSubmit = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname,
      },
    },
  })

  if (error) {
    console.log(error)
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    console.log(data)
    formAction.value.formSuccessMessage = 'Successfully Registered Account'
    // You can add aditional actions here
    refVForm.value?.reset()
  }

  formAction.value.formProcess = false
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
  ></AlertNotification>

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

        <v-btn
          class="mt-4"
          type="submit"
          block
          color="purple-darken-3"
          prepend-icon="mdi-account-plus"
          :disabled="formAction.formProcess"
          :loading="formAction.formProcess"
        >
          Register
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
