<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'

import { ref } from 'vue'
import { onMounted } from 'vue'
import { useReviewersStore } from '@/stores/useReviewersStore'
import { supabase } from '@/utils/supabase'
import { useAuthUserStore } from '@/stores/authUser'

const isDrawerVisible = ref(true)
const newReviewerTitle = ref('')
const newReviewerFile = ref(null)

// Pinia store
const reviewersStore = useReviewersStore()
const reviewers = reviewersStore.reviewers

const authStore = useAuthUserStore()

onMounted(async () => {
  const isAuthenticated = await authStore.isAuthenticated()
  if (!isAuthenticated) {
    alert('You must be logged in to upload a reviewer.')
    return
  }

  // Fetch reviewers
  await reviewersStore.loadReviewersFromSupabase()
})

function handleFileChange(event) {
  newReviewerFile.value = event.target.files[0]
}

async function uploadReviewer() {
  if (!authStore.userData) {
    // Ensure user is authenticated before proceeding
    await authStore.isAuthenticated() // Call isAuthenticated to ensure we have the user data

    if (!authStore.userData) {
      alert('You need to be logged in to upload a reviewer.')
      return
    }
  }

  if (!newReviewerTitle.value || !newReviewerFile.value) {
    alert('Please provide both title and file.')
    return
  }

  try {
    // Step 1: Upload the file to Supabase Storage
    const filePath = `${Date.now()}_${newReviewerFile.value.name}`
    const { error: uploadError } = await supabase.storage
      .from('reviewer-files')
      .upload(filePath, newReviewerFile.value)

    if (uploadError) {
      console.error('Error uploading file:', uploadError.message)
      alert('File upload failed.')
      return
    }

    // Step 2: Prepare data for Supabase
    const newReviewer = {
      user_id: authStore.userData.id, // ✅ Ensure userData is accessible
      file_name: newReviewerTitle.value,
      file_path: filePath,
      description: 'Manual upload via app', // ✏️ Optional field
    }

    // Step 3: Insert into Supabase
    const { data, error } = await supabase.from('reviewers').insert([newReviewer]).select()

    if (error) {
      console.error('Error inserting into Supabase:', error.message)
      alert('Database insertion failed.')
      return
    }

    // Step 4: Update local Pinia store
    reviewersStore.reviewers.push(data[0])

    // Step 5: Reset form
    newReviewerTitle.value = ''
    newReviewerFile.value = null
  } catch (err) {
    console.error('Unexpected error:', err)
    alert('Something went wrong during upload.')
  }
}

function likeReviewer(id) {
  const reviewer = reviewers.find((r) => r.id === id)
  if (reviewer) reviewer.likes++
}

function dislikeReviewer(id) {
  const reviewer = reviewers.find((r) => r.id === id)
  if (reviewer) reviewer.dislikes++
}

function downloadReviewer(fileName) {
  alert(`Downloading: ${fileName}`)
}

function deleteReviewerById(id) {
  if (confirm('Are you sure you want to delete this reviewer?')) {
    reviewersStore.deleteReviewer(id) // ✅ Use the method from the Pinia store
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
        <!-- Upload Section -->
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
          <v-col v-for="reviewer in reviewers" :key="reviewer.id" cols="12" sm="12" md="6" lg="4">
            <v-card class="pa-4 hover:shadow-md transition-all">
              <v-card-title class="font-bold text-primary">
                {{ reviewer.file_name }}
              </v-card-title>

              <v-card-subtitle class="text-gray-500 mb-2">
                Uploaded by: {{ reviewer.user_id }}
              </v-card-subtitle>

              <v-card-text>
                <div class="text-gray-600 mb-4">File: {{ reviewer.file }}</div>

                <div class="d-flex align-center justify-center mb-4">
                  <v-btn icon @click="likeReviewer(reviewer.id)">
                    <v-icon color="green">mdi-thumb-up</v-icon>
                  </v-btn>
                  <span class="mr-4">{{ reviewer.likes }}</span>

                  <v-btn icon @click="dislikeReviewer(reviewer.id)">
                    <v-icon color="red">mdi-thumb-down</v-icon>
                  </v-btn>
                  <span>{{ reviewer.dislikes }}</span>
                </div>
              </v-card-text>

              <v-card-actions class="justify-end">
                <v-row dense wrap class="w-100">
                  <v-col cols="12" sm="auto">
                    <v-btn
                      block
                      color="primary"
                      variant="outlined"
                      @click="downloadReviewer(reviewer.file)"
                    >
                      View
                    </v-btn>
                  </v-col>

                  <v-col cols="12" sm="auto">
                    <v-btn
                      block
                      color="primary"
                      variant="outlined"
                      @click="downloadReviewer(reviewer.file)"
                    >
                      Download
                    </v-btn>
                  </v-col>

                  <v-col cols="12" sm="auto" v-if="reviewer.uploadedBy === 'You'">
                    <v-btn
                      block
                      color="error"
                      variant="text"
                      @click="deleteReviewerById(reviewer.id)"
                    >
                      Delete
                    </v-btn>
                  </v-col>
                </v-row>
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

/* Ensure responsiveness */
@media (max-width: 600px) {
  h1,
  h2 {
    font-size: 1.25rem;
  }
  .pa-6 {
    padding: 1rem !important;
  }
}
</style>
