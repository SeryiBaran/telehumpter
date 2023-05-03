import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

const supabaseConfig = {
  URL: import.meta.env.VITE_SUPABASE_URL,
  PUBLIC_KEY: import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
}

export const supabase = createClient<Database>(supabaseConfig.URL, supabaseConfig.PUBLIC_KEY)
