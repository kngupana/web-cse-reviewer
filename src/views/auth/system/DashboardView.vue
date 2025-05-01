<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref } from 'vue'

const isDrawerVisible = ref(true)

const dashboardStats = [
  { title: 'Registered Examinees', value: 542, icon: 'mdi-account-group' },
  { title: 'Available Reviewers', value: 38, icon: 'mdi-book-open-page-variant' },
  { title: 'Practice Quizzes', value: 15, icon: 'mdi-clipboard-list' },
  { title: 'Uploaded Materials', value: 120, icon: 'mdi-file-document' },
]

const notifications = [
  {
    title: 'Civil Service Exam',
    date: 'June 23, 2025',
    message: 'Mark your calendars! Upcoming CSE.',
  },
  {
    title: 'New Reviewer',
    date: 'April 25, 2025',
    message: 'Mathematics Reviewer Part 2 uploaded.',
  },
]
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
        <!-- Welcome Banner -->
        <v-row align="center" justify="center" class="mb-8">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-3xl font-bold mb-2">Welcome to CSE Reviewer Dashboard</h1>
            <p class="text-gray-600">Prepare, practice, and succeed!</p>
          </v-col>
        </v-row>

        <!-- Dashboard Stats -->
        <v-row dense>
          <v-col v-for="(stat, index) in dashboardStats" :key="index" cols="12" sm="6" md="3">
            <v-card class="pa-4 hover:shadow-lg transition-all">
              <v-card-title class="d-flex align-center justify-center">
                <v-icon size="48" color="primary" class="mb-2">{{ stat.icon }}</v-icon>
              </v-card-title>
              <v-card-text class="text-center">
                <div class="text-h5 font-weight-bold">{{ stat.value }}</div>
                <div class="text-caption text-gray-500">{{ stat.title }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Quick Actions -->
        <v-row class="mt-10">
          <v-col cols="12" md="6">
            <v-card color="primary" dark class="pa-6 hover:shadow-lg transition-all">
              <v-card-title class="text-h6 font-weight-bold"> Start Reviewing </v-card-title>
              <v-card-text>
                Begin reviewing topics and boost your chances of passing the exam.
              </v-card-text>
              <v-card-actions>
                <v-btn color="white" text to="/review-topics">Go to Review Topics</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card class="pa-6 hover:shadow-lg transition-all">
              <v-card-title class="text-h6 font-weight-bold"> Take a Quiz </v-card-title>
              <v-card-text> Test your knowledge by taking practice quizzes anytime. </v-card-text>
              <v-card-actions>
                <v-btn color="primary" text to="/quizzes">Go to Quizzes</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Notifications Section -->
        <v-row class="mt-10">
          <v-col cols="12">
            <h2 class="text-2xl font-bold mb-4">Notifications</h2>
            <v-timeline dense>
              <v-timeline-item
                v-for="(note, idx) in notifications"
                :key="idx"
                :color="idx % 2 === 0 ? 'primary' : 'green'"
                small
              >
                <template #opposite>
                  <div class="text-sm text-gray-500">{{ note.date }}</div>
                </template>
                <v-card class="pa-4">
                  <div class="font-bold">{{ note.title }}</div>
                  <div class="text-gray-600">{{ note.message }}</div>
                </v-card>
              </v-timeline-item>
            </v-timeline>
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
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}
.transition-all {
  transition: all 0.3s ease;
}
</style>
