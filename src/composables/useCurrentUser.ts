import { ref } from 'vue'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseInit'

export function useCurrentUser() {
  const user = ref<User | null>(null)

  supabase.auth.onAuthStateChange((_, session) => {
    user.value = session?.user || null
  })

  supabase.auth.getSession().then(({ data: { session } }) => {
    user.value = session?.user || null
  })

  return user
}
