<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref } from 'vue'

const isDrawerVisible = ref(true)

// Mock user profile data (you can replace with real user data later)
const userProfile = ref({
  name: 'John Doe',
  email: 'johndoe@example.com',
  username: 'johndoe123',
  bio: 'Aspiring Civil Service Officer. Loves math, history, and public service.',
  avatar: 'https://i.pravatar.cc/150?img=3', // Placeholder avatar
})
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible" />
    </template>

    <template #content>
      <v-container fluid class="py-8">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card class="pa-6 text-center rounded-xl hover:shadow-lg transition-all">
              <v-avatar size="120" class="mx-auto mb-4">
                <img :src="userProfile.avatar" alt="User Avatar" />
              </v-avatar>

              <h2 class="text-2xl font-bold mb-1">{{ userProfile.name }}</h2>
              <p class="text-gray-600 mb-4">@{{ userProfile.username }}</p>

              <v-divider class="my-4"></v-divider>

              <v-list-item>
                <v-list-item-title class="font-bold">Email</v-list-item-title>
                <v-list-item-subtitle>{{ userProfile.email }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item class="mt-4">
                <v-list-item-title class="font-bold">Bio</v-list-item-title>
                <v-list-item-subtitle>{{ userProfile.bio }}</v-list-item-subtitle>
              </v-list-item>

              <v-divider class="my-6"></v-divider>

              <v-btn color="primary" variant="flat" class="w-full"> Edit Profile </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.text-gray-600 {
  color: #4b5563;
}
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}
.rounded-xl {
  border-radius: 1rem;
}
</style>
