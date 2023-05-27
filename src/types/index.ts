import type { Database } from './supabase'

export type Post = Database['public']['Tables']['posts']['Row']

export type Profile = Database['public']['Tables']['profiles']['Row']

export interface RegisterForm {
  email: string
  username: string
  password: string
  passwordRepeat: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface PostForm {
  content: string
}
