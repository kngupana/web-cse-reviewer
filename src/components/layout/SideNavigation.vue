<template>
  <v-navigation-drawer :model-value="isDrawerVisible" app color="#4B0082" dark>
    <!-- Navigation List -->
    <v-list dense nav>
      <!-- Dashboard Link -->
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/dashboard" />

      <!-- Reviewer Upload Link -->
      <RouterLink>
        <v-list-item prepend-icon="mdi-upload" title="Upload Reviewer" to="/upload"
      /></RouterLink>
      <RouterLink>
        <v-list-item prepend-icon="mdi-file-document" title="All Reviewers" to="/reviewers"
      /></RouterLink>

      <RouterLink>
        <!-- Profile Link -->
        <v-divider class="my-4"></v-divider>
        <v-list-item prepend-icon="mdi-account" title="Profile" to="/profile"
      /></RouterLink>

      <RouterLink>
        <!-- Account Settings Link -->
        <v-list-item prepend-icon="mdi-cogs" title="Account Settings" to="/account-settings"
      /></RouterLink>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
defineProps({
  isDrawerVisible: Boolean,
})
</script>

<style scoped>
/* Optional: You can customize the side navigation styles here */
</style>
