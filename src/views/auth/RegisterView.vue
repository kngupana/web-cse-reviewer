<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import RegisterForm from '@/components/auth/RegisterForm.vue'

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto pt-16">
          <v-card>
            <v-card-title class="text-center">
              <v-img class="mx-auto" src="images/logo.jpg" :width="mobile ? '75%' : '25%'"></v-img>
              <h3 class="font-weight-black">CSE Reviewer</h3>
              <p class="font-weight-bold">Registration Form</p>
            </v-card-title>

            <RegisterForm></RegisterForm>

            <v-card-text class="bg-surface-light pt-4">
              <v-divider class="my-5"> </v-divider>
              <h5 class="text-center">
                Already have an account?
                <RouterLink color="purple-darken-3 font-weight-black" to="/"
                  >Click here to Login</RouterLink
                >
              </h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
