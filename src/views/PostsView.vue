<script lang="ts" setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'
import { computed } from 'vue'
import PostListItem from '@/components/PostListItem.vue'

const db = useFirestore()

const posts = useCollection(collection(db, 'posts'))

const postsWithoutHidden = computed(() => posts.value.filter(post => !post.hidden))
</script>

<template>
  <div class="grow flex flex-col gap-12">
    <h1 class="text-4xl">
      Хампты
    </h1>
    <PostListItem v-for="post in postsWithoutHidden" :key="post.id" :post="post" />
    <p v-if="postsWithoutHidden.length === 0">
      Пока нет ни одного хампта =(
    </p>
  </div>
</template>
