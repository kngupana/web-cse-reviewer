<script setup>
import { supabase, formActionDefault, getUserInformation } from '@/utils/supabase'
import { getAvatarText} from '@/utils/helpers'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

// Utilize pre-defined vue functions
const router = useRouter()

// Load Variables
const userData = ref({
  initials: '',
  email: '',
  fullname: ''
})
const formAction = ref ({
  ...formActionDefault
})

//Logout Functionality
const onLogout = async () => {
  formAction.value = {...formActionDefault}
  formAction.value.formProcess = true

  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error during logout:', error)
   return
  }

  formAction.value.formProcess = false
  // Redirect to homepage which is ang login view
  router.replace('/')
}

//Getting User Information Functionality
const getUser = async() => {
  const userMetadata = await getUserInformation()

  userData.value.email = userMetadata.email
  userData.value.fullname = userMetadata.firstname + ' ' + userMetadata.lastname
  userData.value.initials = getAvatarText(userData.value.fullname)

}

//Load functions during component rendering
onMounted(() => {
  getUser()
})

</script>

<template>
      <v-menu min-width="200px" rounded>
        <template #activator="{ props }">
          <v-btn icon v-bind="props" class="ml-2">
            <v-avatar color="#3F0071" size="large">
              <span class="text-h5">{{ userData.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>


        <v-card class="mt-1">
          <v-card-text>
            <v-list>
            <v-list-item :subtitle="userData.email" :title="userData.fullname">
              <template #prepend>
              <v-avatar color="#3F0071" size="large">
                 <span class="text-h5">{{ userData.initials }}</span>
              </v-avatar>
             </template>
          </v-list-item>
        </v-list>

              <v-divider class="my-3"></v-divider>

              <v-btn
                prepend-icon="mdi-logout"
                variant="plain"
                @click="onLogout"
                :loading="formAction.formProcess"
                :disabled="formAction.formProcess"
              >
                Logout
              </v-btn>
          </v-card-text>
        </v-card>
      </v-menu>
</template>
