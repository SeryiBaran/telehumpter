import type { Database } from './supabase'

export type Post = Database['public']['Tables']['posts']['Row']

export type Profile = Database['public']['Tables']['profiles']['Row']
