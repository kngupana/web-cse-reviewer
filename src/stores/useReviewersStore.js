import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { supabase } from '@/utils/supabase'
import { useAuthUserStore } from './authUser'


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

    await supabase.from('reviewers').delete().neq('id', 0)

    const transformedData = reviewersFromApi.value.map(r => ({
      user_id: authStore.userData.id,
      file_name: r.name,
      file_path: r.data?. path ?? '',
      description: r.data?.description ?? '',

    }))

    const { data } = await supabase.from('reviewers').insert(transformedData).select()
    if (data) await addReviewers()
  }

  async function addReviewers() {
    const { data } = await supabase.from('reviewers').select('*')
    reviewers.value = data
  }

  function likeReviewer(id) {
    const reviewer = reviewers.value.find(r => r.id === id)
    if (reviewer) reviewer.likes++
  }

  function dislikeReviewer(id) {
    const reviewer = reviewers.value.find(r => r.id === id)
    if (reviewer) reviewer.dislikes++
  }

  function deleteReviewer(id) {
    reviewers.value = reviewers.value.filter(r => r.id !== id)
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
    addReviewer
  }
})
