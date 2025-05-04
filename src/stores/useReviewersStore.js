import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { supabase } from '@/utils/supabase'
import { useAuthUserStore } from './authUser'
import { uploadFile } from '@/utils/uploadService' // Make sure the uploadFile function is imported

export const useReviewersStore = defineStore('reviewers', () => {
  const authStore = useAuthUserStore()

  // State
  const reviewersFromApi = ref([])
  const reviewers = ref([])

  // Reset State
  function $reset() {
    reviewersFromApi.value = []
    reviewers.value = []
  }

  // Actions
  async function addReviewersFromApi() {
    const response = await axios.get('https://api.restful-api.dev/objects')
    reviewersFromApi.value = response.data

    // Delete previous reviewers in Supabase
    await supabase.from('reviewers').delete().neq('id', 0)

    const transformedData = []

    for (const r of reviewersFromApi.value) {
      const file = r.data?.file // assuming r.data.file contains the file object or file path
      let fileUrl = ''

      if (file) {
        try {
          // Upload the file to Supabase and get the URL
          const uploadedFileUrl = await uploadFile(file)
          if (uploadedFileUrl) {
            fileUrl = uploadedFileUrl
          } else {
            console.error(`Failed to upload file for ${r.name}`)
            continue // Skip this reviewer if file upload fails
          }
        } catch (error) {
          console.error('Error uploading file:', error)
          continue // Skip this reviewer if there's an error during upload
        }
      }

      transformedData.push({
        user_id: authStore.userData.id,
        file_name: r.name,
        file_path: fileUrl, // store the file URL
        description: r.data?.description ?? '',
      })
    }

    // Insert reviewers into Supabase
    const { data, error } = await supabase.from('reviewers').insert(transformedData).select()

    if (data) {
      // If data insertion is successful, update the state
      await addReviewers()
    } else {
      console.error('Error inserting reviewers:', error)
    }
  }

  async function addReviewers() {
    const { data, error } = await supabase.from('reviewers').select('*')

    if (data) {
      reviewers.value = data.map((r) => ({
        id: r.id,
        title: r.file_name, // match what your UI expects
        file: r.file_path,
        uploadedBy: 'You', // optional: get user name from authStore
        likes: 0,
        dislikes: 0,
      }))
    }

    if (error) {
      console.error('Error fetching reviewers:', error)
    }
  }

  function likeReviewer(id) {
    const reviewer = reviewers.value.find((r) => r.id === id)
    if (reviewer) reviewer.likes++
  }

  function dislikeReviewer(id) {
    const reviewer = reviewers.value.find((r) => r.id === id)
    if (reviewer) reviewer.dislikes++
  }

  function deleteReviewer(id) {
    reviewers.value = reviewers.value.filter((r) => r.id !== id)
  }

  function addReviewer(newReviewer) {
    if (Array.isArray(reviewers.value)) {
      reviewers.value.push(newReviewer)
    } else {
      reviewers.value = [newReviewer]
    }
  }

  return {
    reviewersFromApi,
    reviewers,
    $reset,
    addReviewersFromApi,
    addReviewers,
    likeReviewer,
    dislikeReviewer,
    deleteReviewer,
    addReviewer,
  }
})
