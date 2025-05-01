// stores/useReactionStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export const useReactionStore = defineStore('reaction', () => {
  // State
  const reactions = ref([])

  // Fetch all reactions
  async function fetchReactions() {
    const { data, error } = await supabase.from('reaction').select('*')
    if (error) {
      console.error('Error fetching reactions:', error.message)
      return
    }
    reactions.value = data
  }

  async function addReaction(reviewerId, type) {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('User not authenticated', userError?.message)
      return
    }

    const { data, error } = await supabase
      .from('reaction')
      .insert([{ reviewer_id: reviewerId, user_id: user.id, type }])
      .select()

    if (error) {
      console.error('Error adding reaction:', error.message)
      return
    }

    reactions.value.push(data[0])
  }

  // Remove a user's reaction to a reviewer
  async function removeReaction(reviewerId, userId) {
    const { error } = await supabase
      .from('reaction')
      .delete()
      .eq('reviewer_id', reviewerId)
      .eq('user_id', userId)

    if (error) {
      console.error('Error removing reaction:', error.message)
      return
    }

    reactions.value = reactions.value.filter(
      (r) => !(r.reviewer_id === reviewerId && r.user_id === userId),
    )
  }

  // Get total likes or dislikes for a reviewer
  function getReactionCount(reviewerId, type) {
    return reactions.value.filter((r) => r.reviewer_id === reviewerId && r.type === type).length
  }

  // Check if a user has reacted to a reviewer
  function getUserReaction(reviewerId, userId) {
    return reactions.value.find((r) => r.reviewer_id === reviewerId && r.user_id === userId)
  }

  return {
    reactions,
    fetchReactions,
    addReaction,
    removeReaction,
    getReactionCount,
    getUserReaction,
  }
})
