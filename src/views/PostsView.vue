<script lang="ts" setup>
import PostListItem from '@/components/PostListItem.vue'
import { usePosts } from '@/composables/usePosts'

const posts = usePosts()
</script>

<template>
  <div class="grow flex flex-col gap-6">
    <h1 class="text-4xl">Хампты</h1>
    <PostListItem v-for="post in posts" :key="post.id" :post="post" />
    <p v-if="posts.length === 0">Пока нет ни одного хампта =(</p>
  </div>
</template>
