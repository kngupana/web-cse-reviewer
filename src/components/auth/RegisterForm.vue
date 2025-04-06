<template>
  <v-form fast-fail @submit.prevent>
    <v-text-field label="Firstname" variant="outlined"></v-text-field>
    <v-text-field label="Lastname" variant="outlined"></v-text-field>

    <v-text-field label="Email" variant="outlined"></v-text-field>

    <v-text-field label="Password" typw="password" variant="outlined"></v-text-field>

    <v-text-field label="Password Confirmation" typw="password" variant="outlined"></v-text-field>

    <v-btn class="mt-2" type="submit" block color="purple-darken-3" prepend-icon="mdi-account-plus"
      >Register</v-btn
    >
  </v-form>
</template>
