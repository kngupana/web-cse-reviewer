<template>
  <v-navigation-drawer
    :model-value="isDrawerVisible"
    app
    color="#2e1065"
    dark
    class="custom-drawer"
  >
  <br>
  <v-list dense nav>
  <v-list-item class="text-center mb-6">
    <img src="/images/logo.jpg" alt="CSE Reviewer Logo" class="logo-image" />
    <div class="text-h6 mt-2 font-weight-bold">CSE Reviewer</div>
  </v-list-item>


      <v-divider class="mb-3"></v-divider>

      <v-list-item to="/dashboard" class="nav-item">
        <template #prepend>
          <v-icon color="cyan-darken-2">mdi-view-dashboard</v-icon>
        </template>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>

      <v-list-item to="/upload" class="nav-item">
        <template #prepend>
          <v-icon color="lime-darken-2">mdi-upload</v-icon>
        </template>
        <v-list-item-title>Upload Reviewer</v-list-item-title>
      </v-list-item>

      <v-list-item to="/reviewers" class="nav-item">
        <template #prepend>
          <v-icon color="pink-darken-2">mdi-file-document</v-icon>
        </template>
        <v-list-item-title>All Reviewers</v-list-item-title>
      </v-list-item>


      <v-divider class="my-3"></v-divider>


      <v-list-item to="/settings" class="nav-item">
        <template #prepend>
          <v-icon color="amber-darken-2">mdi-cogs</v-icon>
        </template>
        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>




<script setup>


defineProps({
  isDrawerVisible: Boolean,
})
</script>

<style scoped>



.logo-image {
  width: 48px;
  height: 48px;
  object-fit: contain;
  margin: 0 auto;
}





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
