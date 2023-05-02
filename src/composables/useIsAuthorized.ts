import { ref } from 'vue'
import { supabase } from '@/lib/supabaseInit'

export function useIsAuthorized() {
  const isAuthorized = ref(false)

  supabase.auth.getSession().then(({ data: { session } }) => {
    isAuthorized.value = !!session
  })

  supabase.auth.onAuthStateChange((_, session) => {
    isAuthorized.value = !!session
  })

  return isAuthorized
}
