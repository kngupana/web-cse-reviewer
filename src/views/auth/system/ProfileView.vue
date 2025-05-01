<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref, onMounted } from 'vue'
import {  getUserInformation, } from '@/utils/supabase'
import { getAvatarText } from '@/utils/helpers'

const isDrawerVisible = ref(true)
const isEditDialogOpen = ref(false)

const userData = ref({
  initials: '',
  email: '',
  fullname: ''
})


const editedProfile = ref({ ...userData.value })

const openEditDialog = () => {
  editedProfile.value = { ...userData.value }
  isEditDialogOpen.value = true
}

const saveProfile = async () => {
  userData.value = { ...editedProfile.value }
  isEditDialogOpen.value = false
  // You can add a Supabase update query here
}

//Getting User Information Functionality
const getUser = async() => {
  const userMetadata = await getUserInformation()

  userData.value.email = userMetadata.email
  userData.value.fullname = userMetadata.firstname + ' ' + userMetadata.lastname
  userData.value.initials = getAvatarText(userData.value.fullname)

}

//Load functions during component rendering
onMounted(() => {
  getUser()
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
  <img v-if="userData.avatar" :src="userData.avatar" alt="User Avatar" />
  <span v-else class="text-h4">{{ userData.initials }}</span>
</v-avatar>

  <h2 class="text-2xl font-bold mb-1">{{ userData.fullname }}</h2>
  <p class="text-gray-600 mb-2">@{{ userData.username }}</p> <!-- Ensure you define 'username' in userData if needed -->
  <p class="text-gray-600 mb-2">{{ userData.email }}</p>

              <v-btn color="primary" variant="flat" class="w-full" @click="openEditDialog">Edit Profile</v-btn>
            </v-card>
          </v-col>
        </v-row>

        <!-- Edit Profile Dialog -->
        <v-dialog v-model="isEditDialogOpen" max-width="500px">
          <v-card>
            <v-card-title>Edit Profile</v-card-title>
            <v-card-text>
              <v-text-field v-model="editedProfile.avatar" label="Profile Image URL" />
              <v-text-field v-model="editedProfile.name" label="Full Name" />
              <v-text-field v-model="editedProfile.email" label="Email" />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="isEditDialogOpen = false">Cancel</v-btn>
              <v-btn color="primary" @click="saveProfile">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
