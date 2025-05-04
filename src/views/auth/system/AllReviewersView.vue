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

function downloadReviewer(fileUrl) {
  window.open(fileUrl, '_blank')
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
  class="py-10 px-4 reviewer-container"
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

              <v-card-text>
                <p class="text-gray-600 mb-3">
                  <v-icon size="18" color="indigo">mdi-file-document</v-icon>
                  {{ reviewer.file_name }}
                </p>

                <div class="d-flex justify-space-between align-center">
                  <div class="d-flex align-center">
                    <v-btn icon @click="likeReviewer(reviewer.id)">
                      <v-icon color="blue">mdi-thumb-up</v-icon>
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

                  <v-card-actions class="justify-end">
                    <v-btn
                      color="primary"
                      variant="outlined"
                      @click="downloadReviewer(reviewer.file_path)"
                    >
                      View
                    </v-btn>

                    <v-btn
                      color="primary"
                      variant="outlined"
                      @click="downloadReviewer(reviewer.file_path)"
                    >
                      Download
                    </v-btn>
                  </v-card-actions>
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
.reviewer-container {
  background: linear-gradient(135deg, #b6a9d6 0%, #cbbce7 100%);
  min-height: 100vh;
  background-attachment: fixed;
  position: relative;
}

.v-theme--dark .reviewer-container {
  background: linear-gradient(to bottom, #1a1a2e, #121212);
}

.reviewer-card {
  background: linear-gradient(to right, #eef2ff, #ffffff);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}
.reviewer-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(30, 58, 138, 0.15);
}

.v-theme--dark .reviewer-card {
  background: linear-gradient(to right, #2a2a3d, #1e1e2e);
  color: #ffffff;
  box-shadow: 0 8px 16px rgba(255, 255, 255, 0.05);
}

.v-theme--dark .text-indigo-900,
.v-theme--dark .text-gray-600,
.v-theme--dark .text-green-700,
.v-theme--dark .text-red-700 {
  color: #ffffff !important;
}

</style>
