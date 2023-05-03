<script lang="ts" setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseInit'
import PostListItem from '@/components/PostListItem.vue'
import type { Post } from '@/types'

const posts = ref<Post[]>([])

supabase.from('posts').select('*').then((data) => {
  if (!data.error)
    posts.value = data.data
})

supabase
  .channel('any')
  .on(
    'postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' },
    ({ new: newContent }: { new: Post }) => {
      posts.value.push(newContent)
    })
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'posts' }, (payload) => {
    posts.value.splice(posts.value.findIndex(post => post.id === payload.old.id), 1)
  })
  .subscribe()
</script>

<template>
  <div class="grow flex flex-col gap-6">
    <h1 class="text-4xl">
      Хампты
    </h1>
    <PostListItem v-for="post in posts" :key="post.id" :post="post" />
    <p v-if="posts.length === 0">
      Пока нет ни одного хампта =(
    </p>
  </div>
</template>
