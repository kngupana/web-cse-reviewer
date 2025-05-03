// src/utils/uploadService.js
import { supabase } from './supabase'

export async function uploadFile(file) {
  if (!file) throw new Error('No file provided')

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`

  const { error } = await supabase.storage
    .from('reviewer-files')
    .upload(fileName, file)

  if (error) throw error

  const { data: publicUrlData } = supabase.storage
    .from('reviewer-files')
    .getPublicUrl(fileName)

  return publicUrlData.publicUrl
}
