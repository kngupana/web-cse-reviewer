<template>
  <v-menu offset-y transition="slide-y-transition">
    <template #activator="{ props }">
      <v-btn v-bind="props" class="d-flex align-center gap-2" variant="text">
        <v-avatar size="36">
          <v-img :src="user?.avatar_url || defaultAvatar" />
        </v-avatar>
        <span class="font-weight-medium">{{ user?.full_name || 'Loading...' }}</span>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-card class="pa-4" width="300">
      <v-row no-gutters class="mb-4">
        <v-col cols="3">
          <v-avatar size="48">
            <v-img :src="user?.avatar_url || defaultAvatar" />
          </v-avatar>
        </v-col>
        <v-col cols="9">
          <div class="font-weight-bold">{{ user?.full_name }}</div>
          <div class="text-caption text-truncate">{{ user?.email }}</div>
        </v-col>
      </v-row>

      <v-divider class="mb-2" />

      <v-btn block color="primary" @click="logout" variant="tonal">
        <v-icon start>mdi-logout</v-icon>
        Logout
      </v-btn>
    </v-card>
  </v-menu>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'
const router = useRouter()

const user = ref(null)
const defaultAvatar = 'https://i.pravatar.cc/150?img=3'

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Failed to get user:', error)
    return
  }

  const sessionUser = data?.user
  if (sessionUser) {
    user.value = {
      email: sessionUser.email,
      full_name: sessionUser.user_metadata?.full_name || 'Anonymous',
      avatar_url: sessionUser.user_metadata?.avatar_url || '',
    }
  }
})

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>
