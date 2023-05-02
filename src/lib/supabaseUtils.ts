import { supabase } from './supabaseInit'

export async function getUser() {
  return supabase.auth.getSession().then(({ data: { session } }) => {
    return session?.user
  })
}
