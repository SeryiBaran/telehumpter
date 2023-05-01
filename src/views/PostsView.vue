<script lang="ts" setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'
import PostListItem from '@/components/PostListItem.vue'

const db = useFirestore()

const posts = useCollection(collection(db, 'posts'))
</script>

<template>
  <div class="grow flex flex-col gap-12">
    <h1 class="text-4xl">
      Хампты
    </h1>
    <PostListItem v-for="post in posts" :key="post.id" :post="post" />
    <p v-if="posts.length === 0">
      Пока нет ни одного хампта =(
    </p>
  </div>
</template>
