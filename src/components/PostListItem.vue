<script lang="ts" setup>
import { computed, ref } from 'vue'
import Avatar from './Avatar.vue'
import { useProfileByID } from '@/composables/useProfileByID'
import type { Post } from '@/types'
import { useAuth } from '@/composables/useAuth'
import { deletePost as apiDeletePost } from '@/api/posts'

const props = defineProps<{
  post: Post
}>()

const { currentUser } = useAuth()

const authorProfile = useProfileByID(props.post.authorId)
const isMyPost = computed(() => currentUser.value?.id === props.post.authorId)

const isLoading = ref(false)

function deletePost() {
  if (isMyPost.value) {
    isLoading.value = true
    apiDeletePost(props.post.id).finally(() => {
      isLoading.value = false
    })
  }
}
</script>

<template>
  <div class="card max-w-md w-full bg-base-200 shadow-xl m-3">
    <div class="card-body">
      <h2 class="card-title">
        <Avatar :user-nick="authorProfile?.username" class="mr-2" />
        <span v-if="isMyPost">Вы</span>
        <span v-else>@{{ authorProfile?.username }}</span>
      </h2>
      <p>{{ props.post.content }}</p>

      <div v-if="isMyPost" class="card-actions justify-end">
        <button
          class="btn btn-error"
          :class="{ loading: isLoading }"
          :disabled="isLoading"
          @click="deletePost"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>
