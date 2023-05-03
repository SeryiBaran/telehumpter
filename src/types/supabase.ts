export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          authorId: string
          content: string
          created_at: string | null
          id: number
          userMetadata: Json | null
        }
        Insert: {
          authorId: string
          content?: string
          created_at?: string | null
          id?: number
          userMetadata?: Json | null
        }
        Update: {
          authorId?: string
          content?: string
          created_at?: string | null
          id?: number
          userMetadata?: Json | null
        }
      }
      profiles: {
        Row: {
          id: string
          username: string
        }
        Insert: {
          id: string
          username: string
        }
        Update: {
          id?: string
          username?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
