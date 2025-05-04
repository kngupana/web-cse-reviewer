<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref, onMounted } from 'vue'
import { useReactionStore } from '@/stores/useReactionStore'
import { supabase } from '@/utils/supabase'

const isDrawerVisible = ref(true)

// Initialize store
const reactionStore = useReactionStore()

const reviewers = ref([])

// User authentication state
const userId = ref(null)

// Load reactions and authenticate user when component mounts
onMounted(async () => {
  // Check if the user is authenticated

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('User not authenticated')
    return
  }
  userId.value = user.id

  // Fetch reactions
  await reactionStore.fetchReactions()

  // Fetch reviewers
  const { data, error } = await supabase.from('reviewers').select('*')
  if (error) {
    console.error('Error fetching reviewers:', error.message)
  } else {
    reviewers.value = data
  }
})

// Like a reviewer
function likeReviewer(reviewerId) {
  const existing = reactionStore.getUserReaction(reviewerId, userId.value)
  if (!existing) {
    reactionStore.addReaction(reviewerId, 'like')
  } else if (existing.type === 'dislike') {
    reactionStore.removeReaction(reviewerId, userId.value)
    reactionStore.addReaction(reviewerId, 'like')
  } else {
    reactionStore.removeReaction(reviewerId, userId.value)
  }
}

// Dislike a reviewer
function dislikeReviewer(reviewerId) {
  const existing = reactionStore.getUserReaction(reviewerId, userId.value)
  if (!existing) {
    reactionStore.addReaction(reviewerId, 'dislike')
  } else if (existing.type === 'like') {
    reactionStore.removeReaction(reviewerId, userId.value)
    reactionStore.addReaction(reviewerId, 'dislike')
  } else {
    reactionStore.removeReaction(reviewerId, userId.value)
  }
}

// Handle download action
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
      <v-container
        fluid
        class="py-10 px-4"
        style="background: linear-gradient(to bottom, #f0f4ff, #ffffff)"
      >
        <h1 class="text-3xl font-bold mb-8 text-center" style="color: #1e3a8a">
          📚 CSE Reviewer Library
        </h1>

        <v-row dense>
          <v-col
            v-for="reviewer in reviewers"
            :key="reviewer.id"
            cols="12"
            sm="6"
            md="4"
            class="d-flex"
          >
            <v-card class="pa-5 rounded-xl elevation-4 reviewer-card" style="width: 100%">
              <v-card-title class="text-lg font-bold text-indigo-900">
                {{ reviewer.title }}
              </v-card-title>

              <v-card-subtitle class="text-sm text-indigo-700 mb-2">
                Uploaded by <strong>{{ reviewer.uploadedBy }}</strong>
              </v-card-subtitle>

              <v-card-text>
                <p class="text-gray-600 mb-3">
                  <v-icon size="18" color="indigo">mdi-file-document</v-icon>
                  {{ reviewer.file_name }}
                </p>

                <div class="d-flex justify-space-between align-center">
                  <div class="d-flex align-center">
                    <v-btn icon @click="likeReviewer(reviewer.id)">
                      <v-icon color="green">mdi-thumb-up</v-icon>
                    </v-btn>
                    <span class="mr-4 font-medium text-green-700">
                      {{ reactionStore.getReactionCount(reviewer.id, 'like') }}
                    </span>

                    <v-btn icon @click="dislikeReviewer(reviewer.id)">
                      <v-icon color="red">mdi-thumb-down</v-icon>
                    </v-btn>
                    <span class="font-medium text-red-700">
                      {{ reactionStore.getReactionCount(reviewer.id, 'dislike') }}
                    </span>
                  </div>

                  <v-btn color="indigo" variant="tonal" @click="downloadReviewer(reviewer.file)">
                    View
                  </v-btn>
                  <v-btn color="indigo" variant="tonal" @click="downloadReviewer(reviewer.file)">
                    Download
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.reviewer-card {
  background: linear-gradient(to right, #eef2ff, #ffffff);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.reviewer-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(30, 58, 138, 0.15);
}
</style>
