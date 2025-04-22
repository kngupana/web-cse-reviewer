<template>
  <v-navigation-drawer
    :model-value="isDrawerVisible"
    app
    color="#4B0082"
    dark
  >
    <v-list dense nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        to="/"
      />
      <v-list-item
        prepend-icon="mdi-book-open-page-variant"
        title="Reviewer"
        to="/reviewer"
      />
      <v-list-item
        prepend-icon="mdi-emoticon-outline"
        title="Reactions"
        to="/reactions"
      />
      <v-list-item
        prepend-icon="mdi-account-cog"
        title="Account Settings"
        to="/settings"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
defineProps({
  isDrawerVisible: Boolean
})
</script>
