// stores/useReactionStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export const useReactionStore = defineStore('reaction', () => {
  const reactions = ref([])

  // Fetch reactions from the database
  async function fetchReactions() {
    const { data, error } = await supabase.from('reactions').select('*')
    if (error) {
      console.error('Error fetching reactions:', error.message)
      return
    }
    if (data) {
      reactions.value = data
    }
  }

  // Add a reaction (like or dislike) to a reviewer
  async function addReaction(reviewerId, type) {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('User not authenticated', userError?.message)
      return
    }

    // Check if the user already has a reaction for this reviewer
    const existingReaction = reactions.value.find(
      (r) => r.reviewer_id === reviewerId && r.user_id === user.id
    )

    // If a reaction exists, update it, otherwise add a new one
    if (existingReaction) {
      if (existingReaction.type === type) {
        console.log(`User already reacted with ${type}`)
        return
      }
      // Remove the existing reaction and add a new one
      await removeReaction(reviewerId)
    }

    // Insert the new reaction into the database
    const { data, error } = await supabase
      .from('reactions')
      .insert([{ reviewer_id: reviewerId, user_id: user.id, type }])
      .select()

    if (error) {
      console.error('Error adding reaction:', error.message)
      return
    }

    // Update the local state immediately
    reactions.value.push(data[0])
  }

  // Remove a reaction from a reviewer
  async function removeReaction(reviewerId) {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('User not authenticated', userError?.message)
      return
    }

    // Delete the reaction from the database
    const { error } = await supabase
      .from('reactions')
      .delete()
      .eq('reviewer_id', reviewerId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error removing reaction:', error.message)
      return
    }

    // Remove the reaction from the local state
    reactions.value = reactions.value.filter(
      (r) => !(r.reviewer_id === reviewerId && r.user_id === user.id)
    )
  }

  // Get the count of reactions (likes or dislikes) for a specific reviewer
  function getReactionCount(reviewerId, type) {
    return reactions.value.filter((r) => r.reviewer_id === reviewerId && r.type === type).length
  }

  // Get the user's specific reaction for a reviewer (like or dislike)
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
