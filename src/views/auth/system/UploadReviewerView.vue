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
const isUploading = ref(false)
const reviewersStore = useReviewersStore()
onMounted(async () => {
  const isLoggedIn = await authStore.isAuthenticated()
  if (!isLoggedIn) {
    alert('You must be logged in to upload reviewers.')
    return
  }
  // Always fetch reviewers on mount
  await reviewersStore.addReviewers()
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
    isUploading.value = true
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
      },
    ])
    if (error) {
      console.error('Error saving to Supabase:', error)
      alert('Failed to save reviewer to database.')
      return
    }
    await reviewersStore.addReviewers()
    newReviewerTitle.value = ''
    newReviewerFile.value = null
    document.querySelector('input[type="file"]').value = ''
    alert('Reviewer uploaded successfully!')
  } catch (error) {
    console.error('Upload error:', error)
    alert('Something went wrong while uploading.')
  } finally {
    isUploading.value = false
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
      <v-container fluid class="py-10 px-6 main-container">
        <!-- Upload Section -->
        <v-card
          class="vibrant-card upload-card pa-8 mb-12"
          elevation="0"
        >
          <div class="d-flex align-center mb-8">
            <div class="icon-container mr-4">
              <v-icon size="32" class="icon-glow" icon="mdi-upload"></v-icon>
            </div>
            <h1 class="vibrant-title">Upload Reviewer</h1>
          </div>
          <v-form>
            <v-text-field
              v-model="newReviewerTitle"
              label="Reviewer Title"
              placeholder="e.g., Logical Reasoning Reviewer"
              prepend-inner-icon="mdi-book-outline"
              variant="outlined"
              density="comfortable"
              color="accent"
              bg-color="rgba(255, 255, 255, 0.9)"
              class="mb-6 vibrant-input"
              hide-details
            />
            <v-file-input
              label="Attach Reviewer File"
              accept=".pdf,.docx"
              prepend-icon="mdi-paperclip"
              variant="outlined"
              density="comfortable"
              color="accent"
              bg-color="rgba(255, 255, 255, 0.9)"
              @change="handleFileChange"
              class="mb-8 vibrant-input"
              hide-details
            />
            <v-btn
              color="accent"
              :loading="isUploading"
              size="large"
              class="vibrant-button px-6"
              block
              @click="uploadReviewer"
            >
              <v-icon left class="mr-2">mdi-cloud-upload</v-icon>
              {{ isUploading ? 'Uploading...' : 'Upload Reviewer' }}
            </v-btn>
          </v-form>
        </v-card>
        <!-- Uploaded Reviewers Section -->
        <div class="section-header d-flex align-center justify-space-between mb-6">
          <div class="d-flex align-center">
            <div class="icon-container-small mr-3">
              <v-icon size="24" class="icon-glow-small">mdi-file-document-multiple</v-icon>
            </div>
            <h2 class="vibrant-subtitle">Your Reviewers</h2>
          </div>
          <v-chip color="accent" variant="elevated" class="stats-chip">
            {{ reviewersStore.reviewers.length }} Files
          </v-chip>
        </div>
        <v-row dense>
          <v-col
            v-for="reviewer in reviewersStore.reviewers"
            :key="reviewer.id"
            cols="12"
            md="6"
            lg="4"
          >
            <v-card
              class="reviewer-card pa-5 mb-6"
              elevation="0"
            >
              <div class="card-pattern"></div>
              <div class="card-content">
                <v-card-title class="text-h6 d-flex align-center mb-3">
                  <v-icon size="22" class="mr-3 file-icon">mdi-file-document</v-icon>
                  <span class="title-text text-truncate">{{ reviewer.title }}</span>
                </v-card-title>
                
                <div class="time-info mb-3">
                  <v-icon size="16" class="mr-1 time-icon">mdi-clock-outline</v-icon>
                  <span class="text-caption">Added {{ new Date().toLocaleDateString() }}</span>
                </div>
                <v-card-actions class="pa-0 justify-space-between mt-2">
                  <v-btn
                    variant="text"
                    color="primary-dark"
                    density="comfortable"
                    class="px-2 view-btn"
                    @click="downloadReviewer(reviewer.file)"
                  >
                    <v-icon size="18" class="mr-1">mdi-eye-outline</v-icon>
                    View
                  </v-btn>
                  
                  <v-btn
                    variant="elevated"
                    color="accent"
                    density="comfortable"
                    class="download-btn px-3"
                    @click="downloadReviewer(reviewer.file)"
                  >
                    <v-icon size="18" class="mr-1">mdi-download</v-icon>
                    Download
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.main-container {
  background: linear-gradient(135deg, #b6a9d6 0%, #cbbce7 100%);
  min-height: 100vh;
  background-attachment: fixed;
  position: relative;
}

.main-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 15% 15%, rgba(255, 255, 255, 0.05) 0%, transparent 15%),
    radial-gradient(circle at 85% 85%, rgba(255, 255, 255, 0.05) 0%, transparent 15%);
  pointer-events: none;
}

.vibrant-title,
.vibrant-subtitle {
  font-size: 28px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;

  background: linear-gradient(135deg, #b175e1 0%, #3b8bd5 100%);

  background: linear-gradient(135deg, #63aff6 100%);

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

.vibrant-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(136, 112, 175, 0.25);
}

.vibrant-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #a4c5e3, #a88fbd, #a4c5e3);
  background-size: 300% 100%;
  animation: gradientMove 6s ease infinite;
}

.upload-card {
  box-shadow: 0 15px 35px rgba(136, 112, 175, 0.3);
}

.reviewer-card {
  background: rgba(255, 255, 255, 0.92);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(136, 112, 175, 0.15);
  backdrop-filter: blur(8px);
}

.reviewer-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(136, 112, 175, 0.25);
  border-color: rgba(168, 143, 189, 0.2);
}

.card-pattern {
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 80px;
  background-image: radial-gradient(circle at 15px 15px, rgba(168, 143, 189, 0.08) 0%, transparent 8px),
                    radial-gradient(circle at 35px 35px, rgba(164, 197, 227, 0.08) 0%, transparent 8px),
                    radial-gradient(circle at 55px 15px, rgba(168, 143, 189, 0.08) 0%, transparent 8px),
                    radial-gradient(circle at 15px 55px, rgba(164, 197, 227, 0.08) 0%, transparent 8px);
  opacity: 0.8;
  z-index: 1;
}

.card-content {
  position: relative;
  z-index: 2;
}

.icon-container {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(168, 143, 189, 0.15) 0%, rgba(164, 197, 227, 0.15) 100%);
  border-radius: 12px;
}

.icon-container-small {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(168, 143, 189, 0.15) 0%, rgba(164, 197, 227, 0.15) 100%);
  border-radius: 8px;
}

.icon-glow {
  color: #a88fbd;
  filter: drop-shadow(0 0 6px rgba(168, 143, 189, 0.6));
}

.icon-glow-small {
  color: #a88fbd;
  filter: drop-shadow(0 0 4px rgba(168, 143, 189, 0.5));
}

.vibrant-button,
.download-btn,
.stats-chip {
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: none;
  background: linear-gradient(135deg, #a88fbd 0%, #8e7ab5 100%);
  box-shadow: 0 6px 15px rgba(168, 143, 189, 0.3);
  transition: all 0.3s ease;
}

.vibrant-button:hover,
.download-btn:hover {
  box-shadow: 0 8px 20px rgba(168, 143, 189, 0.4);
  transform: translateY(-2px);
  background: linear-gradient(135deg, #a88fbd 10%, #8e7ab5 90%);
}

.vibrant-input :deep(.v-field__outline) {
  border-radius: 8px;
}

.vibrant-input :deep(.v-field__input) {
  padding: 12px 16px;
}

.file-icon {
  color: #a88fbd;
  opacity: 0.9;
}

.time-icon {
  color: #a4c5e3;
}

.title-text {
  font-weight: 600;
  color: #2d1950;
}

.time-info {
  display: flex;
  align-items: center;
  color: #6b5b95;
}

.view-btn {
  color: #6b5b95;
}

.view-btn:hover {
  background: rgba(168, 143, 189, 0.08);
}

.stats-chip {
  font-weight: 600;
  letter-spacing: 0.3px;
  background: linear-gradient(135deg, #a88fbd 0%, #8e7ab5 100%);
  color: white;
  box-shadow: 0 4px 10px rgba(168, 143, 189, 0.25);
}

.section-header {
  position: relative;
  margin-top: 1.5rem;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>