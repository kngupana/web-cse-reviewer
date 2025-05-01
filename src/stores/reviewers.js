import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCounterStore = defineStore('reviewers', () => {
  const reviewers = ref([])

  const sample = computed(() => count.value * 2)

  async function getReviewersfromApi() {
    const response = await axios.get('https://api.restful-api.dev/objects')

    reviewers.value = response.data
  }

  return { reviewers, sample, getReviewersfromApi }
})
