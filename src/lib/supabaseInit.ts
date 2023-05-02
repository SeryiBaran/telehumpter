import { createClient } from '@supabase/supabase-js'

const supabaseConfig = {
  URL: import.meta.env.VITE_SUPABASE_URL,
  PUBLIC_KEY: import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
}

export const supabase = createClient(supabaseConfig.URL, supabaseConfig.PUBLIC_KEY)
