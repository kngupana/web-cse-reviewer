<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref } from 'vue'

const isDrawerVisible = ref(true)

// State for loading indicators
const isRefreshing = ref(false)

// Dialog controls
const addItemDialog = ref(false)
const settingsDrawer = ref(false)
const fileInput = ref(null)

// Chart Data
const activityChartOptions = ref({
  chart: {
    type: 'area',
    height: 250,
    toolbar: { show: false },
    zoom: { enabled: false },
    foreColor: '#6b7280',
  },
  colors: ['#4f46e5', '#10b981'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [0, 90, 100],
    },
  },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    labels: {
      style: { fontSize: '12px' },
    },
  },
  yaxis: {
    labels: {
      style: { fontSize: '12px' },
    },
  },
  grid: {
    borderColor: '#e5e7eb',
    strokeDashArray: 4,
  },
  tooltip: {
    theme: 'light',
  },
})

const activitySeries = ref([
  {
    name: 'Visits',
    data: [30, 41, 35, 51, 49, 62, 69],
  },
  {
    name: 'Engagement',
    data: [15, 25, 32, 40, 38, 55, 60],
  },
])

// Stats Data
const stats = ref([
  {
    title: 'Total Users',
    value: '2,456',
    change: '+12%',
    icon: 'mdi-account-group',
    color: 'primary',
  },
  {
    title: 'Active Sessions',
    value: '183',
    change: '+3.2%',
    icon: 'mdi-chart-line',
    color: 'success',
  },
  {
    title: 'Storage Used',
    value: '82%',
    change: '-5%',
    icon: 'mdi-database',
    color: 'warning',
  },
  {
    title: 'Tasks Completed',
    value: '24/30',
    change: '+8%',
    icon: 'mdi-check-circle',
    color: 'info',
  },
])

// Quick Actions
const quickActions = ref([
  { icon: 'mdi-plus', title: 'Add Item', color: 'primary', action: 'addItem' },
  { icon: 'mdi-upload', title: 'Upload Files', color: 'secondary', action: 'uploadFiles' },
  { icon: 'mdi-chart-bar', title: 'View Reports', color: 'success', action: 'viewReports' },
  { icon: 'mdi-cog', title: 'Settings', color: 'info', action: 'openSettings' },
])

// Tasks Data
const tasks = ref([
  {
    id: 1,
    title: 'Update documentation',
    status: 'completed',
    priority: 'medium',
  },
  {
    id: 2,
    title: 'Fix mobile layout issues',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: 3,
    title: 'Add dark mode support',
    status: 'pending',
    priority: 'low',
  },
])

// Click Handlers
const refreshDashboard = async () => {
  isRefreshing.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Dashboard refreshed!')
  } finally {
    isRefreshing.value = false
  }
}

const handleQuickAction = (action) => {
  switch (action) {
    case 'addItem':
      addItemDialog.value = true
      break
    case 'uploadFiles':
      fileInput.value?.click()
      break
    case 'viewReports':
      router.push('/reports')
      break
    case 'openSettings':
      settingsDrawer.value = true
      break
  }
}

const handleFileUpload = (event) => {
  const files = event.target.files
  console.log('Files selected:', files)
  // Add file upload logic here
}

const viewAllTasks = () => {
  router.push('/tasks')
}

const viewTaskDetails = (taskId) => {
  const task = tasks.value.find((t) => t.id === taskId)
  console.log('Viewing task:', task)
  // Could implement task details view here
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

          <!-- Quick Actions -->
          <v-col cols="12" md="4">
            <v-card class="elevation-2 rounded-lg">
              <v-card-title class="text-h6 font-weight-bold">Quick Actions</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col v-for="(action, index) in quickActions" :key="index" cols="6">
                    <v-btn
                      :color="action.color"
                      variant="tonal"
                      block
                      height="100"
                      class="d-flex flex-column"
                      @click="handleQuickAction(action.action)"
                    >
                      <v-icon :icon="action.icon" size="30" class="mb-2"></v-icon>
                      <span class="text-caption">{{ action.title }}</span>
                    </v-btn>
                  </v-col>
                </v-row>
                <!-- Hidden file input -->
                <input
                  ref="fileInput"
                  type="file"
                  style="display: none"
                  @change="handleFileUpload"
                  multiple
                />
              </v-card-text>
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
CAN YOU MAKE A NEW DASHBOARD LAY OUT FOR CIVIL SERVICE EXAM REVIEWER WEB APP WITHOUT REMOVING THE
PROFILE HEADER, LIGHT/DARK MODE, SIDE NAVIGATION AND HEADER AND FOOTER
