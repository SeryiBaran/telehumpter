<script lang="ts" setup>
import { computed, ref } from 'vue'
import { toast } from 'vue3-toastify'
import Avatar from './Avatar.vue'
import { useCurrentUser } from '@/composables/useCurrentUser'
import { supabase } from '@/lib/supabaseInit'
import { useProfileByID } from '@/composables/useProfileByID'

const props = defineProps<{
  post: any
}>()

const currentUser = useCurrentUser()

const authorProfile = useProfileByID(props.post.authorId)
const isMyPost = computed(() => currentUser.value?.id === props.post.authorId)

const isLoading = ref(false)

function deletePost() {
  if (isMyPost.value) {
    isLoading.value = true
    supabase.from('posts').delete().eq('id', props.post.id).then((data) => {
      isLoading.value = false
      if (data.error) {
        toast.error('Что-то пошло не так! Ошибка в консоли браузера.')

        console.error(data.error)
      }
      else {
        toast.success('Хампт удален!')
      }
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
        <span v-else>@{{ props.post.authorNick }}</span>
      </h2>
      <p>{{ props.post.content }}</p>

      <div v-if="isMyPost" class="card-actions justify-end">
        <button class="btn btn-error" :class="{ loading: isLoading }" :disabled="isLoading" @click="deletePost">
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>
