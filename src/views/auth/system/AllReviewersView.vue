<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref, onMounted } from 'vue'
import { useReactionStore } from '@/stores/useReactionStore'
import { useReviewersStore } from '@/stores/useReviewersStore' // if needed

const isDrawerVisible = ref(true)

// Initialize store
const reactionStore = useReactionStore()

const reviewers = ref([])

// Mock user ID for demo
const userId = 'user-123'

// Load reactions when component mounts
onMounted(async () => {
  await reactionStore.fetchReactions()
})

function likeReviewer(reviewerId) {
  const existing = reactionStore.getUserReaction(reviewerId, userId)
  if (!existing) {
    reactionStore.addReaction(reviewerId, userId, 'like')
  } else if (existing.type === 'dislike') {
    reactionStore.removeReaction(reviewerId, userId)
    reactionStore.addReaction(reviewerId, userId, 'like')
  } else {
    reactionStore.removeReaction(reviewerId, userId)
  }
}

function dislikeReviewer(reviewerId) {
  const existing = reactionStore.getUserReaction(reviewerId, userId)
  if (!existing) {
    reactionStore.addReaction(reviewerId, userId, 'dislike')
  } else if (existing.type === 'like') {
    reactionStore.removeReaction(reviewerId, userId)
    reactionStore.addReaction(reviewerId, userId, 'dislike')
  } else {
    reactionStore.removeReaction(reviewerId, userId)
  }
}

function downloadReviewer(fileName) {
  alert(`Downloading: ${fileName}`)
}
</script>

<template>
  <div class="full-screen-gradient stylish-bg">
    <AppLayout
      :is-with-app-bar-nav-icon="true"
      @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
    >
      <template #navigation>
        <SideNavigation :is-drawer-visible="isDrawerVisible" />
      </template>

      <template #content>
        <v-container fluid class="py-16 px-8 stylish-bg">
          <h1 class="text-4xl font-extrabold mb-8 text-center">📚 CSE Reviewer Library</h1>

          <v-row dense>
            <v-col
              v-for="reviewer in reviewers"
              :key="reviewer.id"
              cols="12"
              sm="6"
              md="4"
              class="d-flex"
            >
              <v-card class="pa-6 rounded-2xl elevation-8 reviewer-card" style="width: 100%">
                <v-card-title class="text-xl font-semibold text-indigo-900">
                  {{ reviewer.title }}
                </v-card-title>

                <v-card-subtitle class="text-sm text-indigo-700 mb-2">
                  Uploaded by <strong>{{ reviewer.uploadedBy }}</strong>
                </v-card-subtitle>

                <v-card-text>
                  <p class="text-gray-700 mb-4">
                    <v-icon size="20" color="indigo">mdi-file-document</v-icon>
                    {{ reviewer.file }}
                  </p>

                  <div class="d-flex justify-space-between align-center stylish-bg">
                    <div class="d-flex align-center">
                      <v-btn icon @click="likeReviewer(reviewer.id)" class="mr-2">
                        <v-icon color="green">mdi-thumb-up</v-icon>
                      </v-btn>
                      <span class="mr-4 font-medium text-green-700">
                        {{ reactionStore.getReactionCount(reviewer.id, 'like') }}
                      </span>

                      <v-btn icon @click="dislikeReviewer(reviewer.id)" class="mr-2">
                        <v-icon color="red">mdi-thumb-down</v-icon>
                      </v-btn>
                      <span class="font-medium text-red-700">
                        {{ reactionStore.getReactionCount(reviewer.id, 'dislike') }}
                      </span>
                    </div>

                    <v-btn
                      color="indigo"
                      variant="tonal"
                      @click="downloadReviewer(reviewer.file)"
                      class="rounded-lg px-6 py-3"
                    >
                      View / Download
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </AppLayout>
  </div>
</template>

<style scoped>
.full-screen-gradient {
  min-height: 100vh;
  background: linear-gradient(135deg, #d4a5f9, #f3e6f5);
}

.stylish-bg {
  background: linear-gradient(135deg, #d4a5f9, #f3e6f5); /* Vibrant gradient */
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.1); /* Enhanced shadow for elevation */
}
.reviewer-card {
  background: linear-gradient(to right, #f0f8ff, #ffffff);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.reviewer-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 24px rgba(30, 58, 138, 0.2);
}

.v-card-title {
  font-weight: 600;
  color: #1e3a8a;
}

.v-card-subtitle {
  color: #4b6d92;
}

.v-btn {
  transition: all 0.3s ease;
}

.v-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
