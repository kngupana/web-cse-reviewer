import { createClient } from '@supabase/supabase-js'

// Single supabase client for interacting with database
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

//Form Action utils
export const formActionDefault = {
  formProcess: false,
  formStatus: 200,
  formErrorMessage: '',
  formSuccessMessage: '',
}

//Check if the session exists and is valid; Return false if there'san error
export const isAuthenticated = async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Error getting session', error.message)
    return false
  }

  return !!data.session

}

// Retrieve user information
export const getUserInformation = async() => {
  const {
    data: {
      user: { user_metadata }
    }
  } = await supabase.auth.getUser()

  return user_metadata


}
