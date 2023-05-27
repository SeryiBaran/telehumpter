<script lang="ts" setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { postFormSchema } from '@/yup/postForm.schema'
import { createPost } from '@/api/posts'
import type { PostForm } from '@/types'

const { handleSubmit, errors, values } = useForm<PostForm>({
  validationSchema: postFormSchema,
})

useField('content')

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
    <h1 class="text-4xl">Хамптнуть</h1>
    <form class="max-w-sm w-full flex flex-col gap-2" @submit="onSubmit">
      <textarea
        v-model="values.content"
        name="content"
        type="text"
        placeholder="Напишите что-нибудь!"
        class="textarea textarea-bordered"
      />
      <span class="text-error">{{ errors.content }}</span>
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
