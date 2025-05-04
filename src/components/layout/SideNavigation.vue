<template>
  <v-navigation-drawer
    :model-value="isDrawerVisible"
    app
    color="#2e1065"
    dark
    class="custom-drawer"
  >
    <v-list dense nav>
      <v-list-item class="text-center mb-6">
        <v-icon color="deep-purple-lighten-3" size="40">mdi-book-open-page-variant</v-icon>
        <div class="text-h6 mt-2 font-weight-bold">CSE Reviewer</div>
      </v-list-item>

      <v-divider class="mb-3"></v-divider>

      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        to="/dashboard"
        class="nav-item"
      />

      <v-list-item
        prepend-icon="mdi-upload"
        title="Upload Reviewer"
        to="/upload"
        class="nav-item"
      />

      <v-list-item
        prepend-icon="mdi-file-document"
        title="All Reviewers"
        to="/reviewers"
        class="nav-item"
      />

      <v-divider class="my-3"></v-divider>

      

      <v-list-item prepend-icon="mdi-cogs" title="Settings" to="/settings" class="nav-item" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
defineProps({
  isDrawerVisible: Boolean,
})
</script>

<style scoped>
.custom-drawer {
  background: linear-gradient(to bottom, #2e1065, #4b0082);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-item {
  border-radius: 8px;
  margin-bottom: 6px;
  transition: background 0.3s ease;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
