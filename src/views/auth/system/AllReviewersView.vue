<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref } from 'vue'

// Side Navigation control
const isDrawerVisible = ref(true)

// Reviewers list (this can later be replaced with real API or a store)
const reviewers = ref([
  {
    id: 1,
    title: 'Mathematics Reviewer',
    file: 'math.pdf',
    likes: 12,
    dislikes: 1,
    uploadedBy: 'UserA',
  },
  {
    id: 2,
    title: 'English Grammar Reviewer',
    file: 'english.pdf',
    likes: 8,
    dislikes: 0,
    uploadedBy: 'UserB',
  },
])

// Like and Dislike handlers
function likeReviewer(id) {
  const reviewer = reviewers.value.find((r) => r.id === id)
  if (reviewer) reviewer.likes++
}

function dislikeReviewer(id) {
  const reviewer = reviewers.value.find((r) => r.id === id)
  if (reviewer) reviewer.dislikes++
}

// Download handler
function downloadReviewer(fileName) {
  alert(`Downloading: ${fileName}`)
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
        <h1 class="text-2xl font-bold mb-6">All Uploaded Reviewers</h1>

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
.hover\:shadow-md:hover {
  box-shadow: 0 6px 12px -3px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease;
}
.transition-all {
  transition: all 0.3s ease;
}
</style>
