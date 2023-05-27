import { ref } from 'vue'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseInit'
import { loginWithPassword, logout, register } from '@/api/auth'

export function useAuth() {
  const currentUser = ref<User | null>(null)
  const isAuthorized = ref(false)

  function updateAuthState(session: Session | null) {
    currentUser.value = session?.user || null
    isAuthorized.value = !!session
  }

  supabase.auth.onAuthStateChange((_, session) => {
    updateAuthState(session)
  })

  supabase.auth.getSession().then(({ data: { session } }) => {
    updateAuthState(session)
  })

  return { currentUser, register, loginWithPassword, logout, isAuthorized }
}
