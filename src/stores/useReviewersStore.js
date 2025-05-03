import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { supabase } from '@/utils/supabase'
import { useAuthUserStore } from './authUser'

export const useReviewersStore = defineStore('reviewers', () => {
  const authStore = useAuthUserStore()

  // State to store reviewers from API and Supabase
  const reviewersFromApi = ref([])
  const reviewers = ref([])

  // Reset State
  function $reset() {
    reviewersFromApi.value = []
    reviewers.value = []
  }

  // Actions
  async function loadReviewersFromSupabase() {
    const { data, error } = await supabase.from('reviewers').select(`
      id, file_name, file_path, description, likes, dislikes,
      users ( full_name )
    `)

    if (error) {
      console.error('Error fetching reviewers:', error.message)
      return
    }

    reviewers.value = data || [] // Store fetched data in the reviewers state
  }

  async function addReviewersFromApi() {
    const response = await axios.get('https://api.restful-api.dev/objects')
    reviewersFromApi.value = response.data

    await supabase.from('reviewers').delete().neq('id', 0)

    const transformedData = reviewersFromApi.value.map((r) => ({
      user_id: authStore.userData.id,
      file_name: r.name,
      file_path: r.data?.path ?? '',
      description: r.data?.description ?? '',
      uploaded_by: authStore.userData.username || 'Unknown', // Ensure uploaded_by field is filled
    }))

    const { data, error } = await supabase
      .from('reviewers')
      .select('id, file_name, file_path, description, likes, dislikes')

    if (error) {
      console.error('Error inserting reviewers into Supabase:', error.message)
      return
    }

    // Add the new reviewers into the local store
    reviewers.value = [...reviewers.value, ...data]
  }

  async function addReviewers(newReviewer) {
    const { data, error } = await supabase.from('reviewers').insert([newReviewer]).select()

    if (error) {
      console.error('Error inserting reviewer into Supabase:', error.message)
      return
    }

    reviewers.value.push(data[0]) // Add the inserted reviewer to the store
  }

  function likeReviewer(id) {
    const reviewer = reviewers.value.find((r) => r.id === id)
    if (reviewer) {
      reviewer.likes++
      updateReviewerLikesInSupabase(id, reviewer.likes)
    }
  }

  function dislikeReviewer(id) {
    const reviewer = reviewers.value.find((r) => r.id === id)
    if (reviewer) {
      reviewer.dislikes++
      updateReviewerDislikesInSupabase(id, reviewer.dislikes)
    }
  }

  async function updateReviewerLikesInSupabase(id, likes) {
    const { error } = await supabase.from('reviewers').update({ likes }).eq('id', id)

    if (error) {
      console.error('Error updating reviewer likes:', error.message)
    }
  }

  async function updateReviewerDislikesInSupabase(id, dislikes) {
    const { error } = await supabase.from('reviewers').update({ dislikes }).eq('id', id)

    if (error) {
      console.error('Error updating reviewer dislikes:', error.message)
    }
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
    loadReviewersFromSupabase,
    addReviewersFromApi,
    addReviewers,
    likeReviewer,
    dislikeReviewer,
    deleteReviewer,
    addReviewer,
  }
})
