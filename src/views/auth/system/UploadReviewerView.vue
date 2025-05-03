<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'

import { ref, onMounted } from 'vue'
import { useReviewersStore } from '@/stores/useReviewersStore'
import { uploadFile } from '@/utils/uploadService'
import { supabase } from '@/utils/supabase'
import { useAuthUserStore } from '@/stores/authUser'

const authStore = useAuthUserStore()
const isDrawerVisible = ref(true)
const newReviewerTitle = ref('')
const newReviewerFile = ref(null)

const reviewersStore = useReviewersStore()
const reviewers = reviewersStore.reviewers

onMounted(async () => {
  const isLoggedIn = await authStore.isAuthenticated()
  if (!isLoggedIn) {
    alert('You must be logged in to upload reviewers.')
    return
  }

  if (reviewersStore.reviewers.length === 0) {
    await reviewersStore.addReviewers()
  }
})

function handleFileChange(event) {
  newReviewerFile.value = event.target.files[0]
}

async function uploadReviewer() {
  if (!newReviewerTitle.value || !newReviewerFile.value) {
    alert('Please provide both title and file.')
    return
  }

  const userId = authStore.userData?.id
  if (!userId) {
    alert('User not found. Please log in again.')
    return
  }

  try {
    const fileUrl = await uploadFile(newReviewerFile.value)

    if (!fileUrl) {
      alert('File upload failed.')
      return
    }

    const { data, error } = await supabase.from('reviewers').insert([
      {
        user_id: userId,
        file_name: newReviewerTitle.value,
        file_path: fileUrl,
        description: '',
      }
    ])

    if (error) {
      console.error('Error saving to Supabase:', error)
      alert('Failed to save reviewer to database.')
      return
    }

    await reviewersStore.addReviewers()

    newReviewerTitle.value = ''
    newReviewerFile.value = null

    alert('Reviewer uploaded successfully!')
  } catch (error) {
    console.error('Upload error:', error)
    alert('Something went wrong while uploading.')
  }
}

function downloadReviewer(fileUrl) {
  window.open(fileUrl, '_blank')
}

function deleteReviewerById(id) {
  if (confirm('Are you sure you want to delete this reviewer?')) {
    reviewersStore.deleteReviewer(id)
  }
}
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
      <v-container fluid class="py-6">
        Upload Section
        <v-card class="pa-6 mb-10 hover:shadow-lg transition-all">
          <h1 class="text-2xl font-bold mb-4">Upload Your Reviewer</h1>

          <v-form>
            <v-text-field
              v-model="newReviewerTitle"
              label="Reviewer Title"
              placeholder="e.g., Numerical Reasoning Reviewer"
              outlined
              class="mb-4"
            />

            <v-file-input
              label="Attach Reviewer File (PDF, DOCX)"
              accept=".pdf,.docx"
              outlined
              @change="handleFileChange"
              class="mb-4"
            />

            <v-btn color="primary" @click="uploadReviewer">Upload Reviewer</v-btn>
          </v-form>
        </v-card>

        <!-- Uploaded Reviewers Section -->
        <h2 class="text-2xl font-bold mb-4">Uploaded Reviewers</h2>

        <v-row dense>
          <v-col v-for="reviewer in reviewers" :key="reviewer.id" cols="12" md="6" lg="4">
            <v-card class="pa-4 hover:shadow-md transition-all">
              <v-card-title class="font-bold text-primary">
                {{ reviewer.title }}
              </v-card-title>

              <v-card-subtitle class="text-gray-500 mb-2">
                Uploaded by: {{ reviewer.uploadedBy }}
              </v-card-subtitle>

              <v-card-actions class="justify-end">
                <v-btn color="primary" variant="outlined" @click="downloadReviewer(reviewer.file)">
                  View
                </v-btn>
                <v-btn color="primary" variant="outlined" @click="downloadReviewer(reviewer.file)">
                 Download
                </v-btn>

                <v-btn
                  color="error"
                  variant="text"
                  v-if="reviewer.uploadedBy === 'You'"
                  @click="deleteReviewerById(reviewer.id)"
                >
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.text-gray-500 {
  color: #6b7280;
}
.text-gray-600 {
  color: #4b5563;
}
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 20px -3px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}
.hover\:shadow-md:hover {
  box-shadow: 0 6px 12px -3px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease;
}
.transition-all {
  transition: all 0.3s ease;
}
</style>