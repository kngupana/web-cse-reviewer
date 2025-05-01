import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useReviewersStore = defineStore('reviewers', () => {
  // State
  const reviewers = ref([])

  // Actions
  async function fetchReviewers() {
    try {
      const response = await axios.get('https://api.restful-api.dev/objects')
      reviewers.value = response.data
    } catch (error) {
      console.error('Error fetching reviewers:', error)
    }
  }

  async function addReviewer(newReviewer) {
    try {
      // POST request to add new reviewer
      const response = await axios.post('https://api.example.com/reviewers', newReviewer)
      reviewers.value.push(response.data)
    } catch (error) {
      console.error('Error adding reviewer:', error)
    }
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

  return {
    reviewers,
    fetchReviewers,
    addReviewer,
    likeReviewer,
    dislikeReviewer,
    deleteReviewer
  }
})
