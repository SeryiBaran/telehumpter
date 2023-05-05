import { ref } from 'vue'
import { supabase } from '@/lib/supabaseInit'
import type { Profile } from '@/types'

export function useProfileByID(id: string) {
  const profile = ref<Profile | null>(null)

  supabase
    .from('profiles')
    .select('username, id')
    .eq('id', id)
    .then((data) => {
      profile.value = data.data?.[0] || null
    })

  return profile
}
