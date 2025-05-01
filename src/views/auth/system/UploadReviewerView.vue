<script setup>
import { onMounted } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useRouter } from 'vue-router'

onMounted(() => {
  console.log('UploadReviewerView mounted')
})

// Side Navigation control
const isDrawerVisible = ref(true)

// Reviewers data
const reviewers = ref([])

const newReviewerTitle = ref('')
const newReviewerFile = ref(null)

// Handle file selection
function handleFileChange(event) {
  newReviewerFile.value = event.target.files[0]
}

// Upload new reviewer
function uploadReviewer() {
  if (!newReviewerTitle.value || !newReviewerFile.value) {
    alert('Please provide both title and file.')
    return
  }

  reviewers.value.push({
    id: reviewers.value.length + 1,
    title: newReviewerTitle.value,
    file: newReviewerFile.value.name,
    likes: 0,
    dislikes: 0,
    uploadedBy: 'You', // Replace with logged-in user name later
  })

  // Clear form
  newReviewerTitle.value = ''
  newReviewerFile.value = null
}

// Like and dislike
function likeReviewer(id) {
  const reviewer = reviewers.value.find((r) => r.id === id)
  if (reviewer) reviewer.likes++
}

function dislikeReviewer(id) {
  const reviewer = reviewers.value.find((r) => r.id === id)
  if (reviewer) reviewer.dislikes++
}

// Download reviewer
function downloadReviewer(fileName) {
  // Assuming files are saved under /public/uploads/
  const fileUrl = `/uploads/${fileName}`
  window.open(fileUrl, '_blank')
}

// Delete reviewer
function deleteReviewer(id) {
  if (confirm('Are you sure you want to delete this reviewer?')) {
    reviewers.value = reviewers.value.filter((r) => r.id !== id)
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
          <v-col v-for="reviewer in reviewers" :key="reviewer.id" cols="12" md="6" lg="4">
            <v-card class="pa-4 hover:shadow-md transition-all">
              <v-card-title class="font-bold text-primary">
                {{ reviewer.title }}
              </v-card-title>

              <v-card-subtitle class="text-gray-500 mb-2">
                Uploaded by: {{ reviewer.uploadedBy }}
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
                <v-btn color="primary" variant="outlined" @click="downloadReviewer(reviewer.file)">
                  View/Download
                </v-btn>

                <v-btn
                  color="error"
                  variant="text"
                  v-if="reviewer.uploadedBy === 'You'"
                  @click="deleteReviewer(reviewer.id)"
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
