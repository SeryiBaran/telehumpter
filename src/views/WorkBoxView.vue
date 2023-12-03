<script lang="ts" setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { postFormSchema } from '@/yup/postForm.schema'
import { createPost } from '@/api/posts'
import Input from '@/components/Input.vue'
import type { PostForm } from '@/types'

const { handleSubmit } = useForm<PostForm>({
  validationSchema: postFormSchema,
})

const isLoading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  createPost(values).finally(() => {
    isLoading.value = false
  })
})
</script>

<template>
  <div class="grow flex flex-col gap-12">
    <h1 class="text-4xl">
      Хамптнуть
    </h1>
    <form class="max-w-sm w-full flex flex-col gap-2" @submit="onSubmit">
      <Input
        is="textarea"
        name="content"
        placeholder="Напишите что-нибудь!"
      />
      <button
        type="submit"
        class="btn btn-primary"
        :class="{ loading: isLoading }"
        :disabled="isLoading"
      >
        Хамптнуть
      </button>
    </form>
  </div>
</template>

<style scoped></style>
