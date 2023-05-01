<script lang="ts" setup>
import { useCurrentUser, useFirestore } from 'vuefire'
import { deleteDoc, doc } from 'firebase/firestore'
import { computed } from 'vue'
import Avatar from './Avatar.vue'

const props = defineProps<{
  post: any
}>()

const db = useFirestore()
const currentUser = useCurrentUser()

const isMyPost = computed(() => props.post.authorNick === currentUser.value?.displayName)

function deletePost() {
  deleteDoc(doc(db, 'posts', props.post.id))
}
</script>

<template>
  <div class="card max-w-md w-full bg-base-200 shadow-xl m-3">
    <div class="card-body">
      <h2 class="card-title">
        <Avatar :user-nick="post.authorNick" class="mr-2" />
        <span v-if="isMyPost">Вы</span>
        <span v-else>@{{ props.post.authorNick }}</span>
      </h2>
      <p>{{ props.post.content }}</p>

      <div v-if="isMyPost" class="card-actions justify-end">
        <button class="btn btn-error" @click="deletePost">
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>
