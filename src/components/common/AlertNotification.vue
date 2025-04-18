<script setup>
defineProps({
  formSuccessMessage: String,
  formErrorMessage: String,
})
</script>

<template>
  <v-alert
    v-if="formSuccessMessage"
    :text="formSuccessMessage"
    title="Success!"
    type="success"
    variant="tonal"
    density="compact"
    boarder="start"
    closable
  >
  </v-alert>

  <v-alert
    v-if="formErrorMessage"
    :text="formErrorMessage"
    title="Ooops!"
    type="error"
    variant="tonal"
    density="compact"
    boarder="start"
    closable
  ></v-alert>
</template>
