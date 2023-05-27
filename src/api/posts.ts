import { toast } from 'vue3-toastify'
import { supabase } from '@/lib/supabaseInit'
import type { Post, PostForm } from '@/types'
import { getUser } from '@/lib/supabaseUtils'
import router from '@/router'
import { RoutesPaths } from '@/router/routes'

export async function deletePost(id: Post['id']) {
  return supabase
    .from('posts')
    .delete()
    .eq('id', id)
    .then((data) => {
      if (data.error) {
        toast.error('Что-то пошло не так! Ошибка в консоли браузера.')

        console.error(data.error)
      } else {
        toast.success('Хампт удален!')
      }
    })
}

export async function createPost(values: PostForm) {
  const user = await getUser()

  if (user) {
    return supabase
      .from('posts')
      .insert({ content: values.content, authorId: user.id })
      .then((data) => {
        if (data.error) {
          toast.error('Что-то пошло не так! Ошибка в консоли браузера.')

          console.error(data.error)
        } else {
          toast.success('Хампт создан!')

          router.push(RoutesPaths.POSTS)
        }
      })
  } else {
    toast.error('Вы не авторизованы!')
  }
}
