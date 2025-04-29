<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useRouter } from 'vue-router'

const router = useRouter()
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
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [0, 90, 100]
    }
  },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    labels: {
      style: { fontSize: '12px' }
    }
  },
  yaxis: {
    labels: {
      style: { fontSize: '12px' }
    }
  },
  grid: {
    borderColor: '#e5e7eb',
    strokeDashArray: 4,
  },
  tooltip: {
    theme: 'light'
  }
})

const activitySeries = ref([
  {
    name: 'Visits',
    data: [30, 41, 35, 51, 49, 62, 69]
  },
  {
    name: 'Engagement',
    data: [15, 25, 32, 40, 38, 55, 60]
  }
])

// Stats Data
const stats = ref([
  {
    title: 'Total Users',
    value: '2,456',
    change: '+12%',
    icon: 'mdi-account-group',
    color: 'primary'
  },
  {
    title: 'Active Sessions',
    value: '183',
    change: '+3.2%',
    icon: 'mdi-chart-line',
    color: 'success'
  },
  {
    title: 'Storage Used',
    value: '82%',
    change: '-5%',
    icon: 'mdi-database',
    color: 'warning'
  },
  {
    title: 'Tasks Completed',
    value: '24/30',
    change: '+8%',
    icon: 'mdi-check-circle',
    color: 'info'
  }
])

// Quick Actions
const quickActions = ref([
  { icon: 'mdi-plus', title: 'Add Item', color: 'primary', action: 'addItem' },
  { icon: 'mdi-upload', title: 'Upload Files', color: 'secondary', action: 'uploadFiles' },
  { icon: 'mdi-chart-bar', title: 'View Reports', color: 'success', action: 'viewReports' },
  { icon: 'mdi-cog', title: 'Settings', color: 'info', action: 'openSettings' }
])

// Tasks Data
const tasks = ref([
  {
    id: 1,
    title: 'Update documentation',
    status: 'completed',
    priority: 'medium'
  },
  {
    id: 2,
    title: 'Fix mobile layout issues',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 3,
    title: 'Add dark mode support',
    status: 'pending',
    priority: 'low'
  }
])

// Click Handlers
const refreshDashboard = async () => {
  isRefreshing.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Dashboard refreshed!')
  } finally {
    isRefreshing.value = false
  }
}

const handleQuickAction = (action) => {
  switch(action) {
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
  const task = tasks.value.find(t => t.id === taskId)
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
      <v-container class="py-6">
        <!-- Header -->
        <v-row class="mb-4">
          <v-col cols="12">
            <div class="d-flex justify-space-between align-center">
              <div>
                <h1 class="text-h4 font-weight-bold">Dashboard</h1>
                <p class="text-subtitle-1 text-grey">Welcome back! Here's what's happening today.</p>
              </div>
              <v-btn
                color="primary"
                prepend-icon="mdi-refresh"
                :loading="isRefreshing"
                @click="refreshDashboard"
              >
                Refresh
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <!-- Stats Cards -->
        <v-row class="mb-6">
          <v-col v-for="(stat, index) in stats" :key="index" cols="12" sm="6" md="3">
            <v-card class="elevation-2 rounded-lg" :color="stat.color" variant="tonal">
              <v-card-text class="pa-4">
                <div class="d-flex justify-space-between align-center">
                  <div>
                    <p class="text-subtitle-2 text-medium-emphasis">{{ stat.title }}</p>
                    <h3 class="text-h5 font-weight-bold">{{ stat.value }}</h3>
                    <span class="text-caption" :class="stat.change.startsWith('+') ? 'text-success' : 'text-error'">
                      {{ stat.change }} from last week
                    </span>
                  </div>
                  <v-icon :icon="stat.icon" size="40" class="opacity-50"></v-icon>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Main Content -->
        <v-row class="mb-6">
          <!-- Activity Chart -->
          <v-col cols="12" md="8">
            <v-card class="elevation-2 rounded-lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <span class="text-h6 font-weight-bold">Weekly Activity</span>
                <v-chip variant="outlined" color="primary" size="small">Last 7 days</v-chip>
              </v-card-title>
              <v-card-text>
                <VueApexCharts
                  type="area"
                  height="300"
                  :options="activityChartOptions"
                  :series="activitySeries"
                />
              </v-card-text>
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
                >
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Bottom Row -->
        <v-row>
          <!-- Recent Tasks -->
          <v-col cols="12" md="6">
            <v-card class="elevation-2 rounded-lg">
              <v-card-title class="text-h6 font-weight-bold">Recent Tasks</v-card-title>
              <v-card-text>
                <v-list lines="two">
                  <v-list-item
                    v-for="(task, index) in tasks"
                    :key="index"
                    :title="task.title"
                    :subtitle="`Priority: ${task.priority}`"
                    @click="viewTaskDetails(task.id)"
                  >
                    <template v-slot:prepend>
                      <v-icon
                        :color="task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'warning' : 'grey'"
                        :icon="task.status === 'completed' ? 'mdi-check-circle' : task.status === 'in-progress' ? 'mdi-progress-clock' : 'mdi-clock-outline'"
                      ></v-icon>
                    </template>
                    <template v-slot:append>
                      <v-chip
                        size="small"
                        :color="task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'success'"
                        variant="outlined"
                      >
                        {{ task.priority }}
                      </v-chip>
                    </template>
                  </v-list-item>
                </v-list>
                <v-btn
                  block
                  variant="text"
                  color="primary"
                  class="mt-2"
                  @click="viewAllTasks"
                >
                  View All Tasks
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- System Status -->
          <v-col cols="12" md="6">
            <v-card class="elevation-2 rounded-lg">
              <v-card-title class="text-h6 font-weight-bold">System Status</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>Server Load</v-list-item-title>
                    <template v-slot:append>
                      <v-progress-linear
                        model-value="65"
                        color="warning"
                        height="8"
                        rounded
                        class="w-50"
                      ></v-progress-linear>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Database</v-list-item-title>
                    <template v-slot:append>
                      <v-chip color="success" size="small">Healthy</v-chip>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Storage</v-list-item-title>
                    <template v-slot:append>
                      <v-chip color="warning" size="small">82% Used</v-chip>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Last Backup</v-list-item-title>
                    <template v-slot:append>
                      <span class="text-caption text-medium-emphasis">2 hours ago</span>
                    </template>
                  </v-list-item>
                </v-list>

                <v-alert
                  type="info"
                  variant="tonal"
                  class="mt-4"
                  icon="mdi-information"
                >
                  Scheduled maintenance tonight at 2:00 AM
                </v-alert>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Add Item Dialog -->
      <v-dialog v-model="addItemDialog" max-width="600">
        <v-card>
          <v-card-title>Add New Item</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Item Name" variant="outlined"></v-text-field>
              <v-textarea label="Description" variant="outlined"></v-textarea>
              <v-select
                label="Category"
                :items="['Feature', 'Bug', 'Improvement']"
                variant="outlined"
              ></v-select>
              <div class="d-flex justify-end">
                <v-btn variant="text" @click="addItemDialog = false">Cancel</v-btn>
                <v-btn color="primary" class="ml-2">Add Item</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- Settings Drawer -->
      <v-navigation-drawer v-model="settingsDrawer" temporary location="right" width="400">
        <v-toolbar color="primary" density="compact">
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-btn icon="mdi-close" @click="settingsDrawer = false"></v-btn>
        </v-toolbar>
        <v-card-text>
          <v-list>
            <v-list-item title="Account Settings" prepend-icon="mdi-account"></v-list-item>
            <v-list-item title="Notifications" prepend-icon="mdi-bell"></v-list-item>
            <v-list-item title="Theme" prepend-icon="mdi-palette"></v-list-item>
            <v-list-item title="Privacy" prepend-icon="mdi-lock"></v-list-item>
          </v-list>
        </v-card-text>
      </v-navigation-drawer>
    </template>
  </AppLayout>
</template>

<style scoped>
.v-card {
  transition: transform 0.2s ease;
}

.v-card:hover {
  transform: translateY(-2px);
}

.rounded-lg {
  border-radius: 12px;
}

.opacity-50 {
  opacity: 0.5;
}

.v-list-item {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
