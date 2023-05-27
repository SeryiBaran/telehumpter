import { ref } from 'vue'
import { supabase } from '@/lib/supabaseInit'
import type { Post } from '@/types'

export function usePosts() {
  const posts = ref<Post[]>([])

  supabase
    .from('posts')
    .select('*')
    .then((data) => {
      // TODO: постараться исправить
      // @ts-expect-error Type instantiation is excessively deep and possibly infinite. ts(2589)
      if (!data.error) posts.value = data.data
    })

  supabase
    .channel('any')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'posts' },
      ({ new: newContent }: { new: Post }) => {
        posts.value.push(newContent)
      }
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'posts' },
      (payload) => {
        posts.value.splice(
          posts.value.findIndex((post) => post.id === payload.old.id),
          1
        )
      }
    )
    .subscribe()

  return posts
}
