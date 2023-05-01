<script lang="ts" setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { useFirebaseAuth, useFirestore } from 'vuefire'
import { addDoc, collection } from 'firebase/firestore'
import { toast } from 'vue3-toastify'

const router = useRouter()

const db = useFirestore()

const auth = useFirebaseAuth()

interface LoginForm {
  content: string
}

const { handleSubmit, errors, values } = useForm<LoginForm>({
  validationSchema: {
    content: yup
      .string()
      .required('Это поле обязательно!')
      .min(4, 'Это поле должно быть не менее 4 символов!').max(1000, 'Это поле должно быть не более 1000 символов!'),
  },
})

useField('content')

const isLoading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  addDoc(collection(db, 'posts'), {
    authorId: auth?.currentUser?.uid,
    authorNick: auth?.currentUser?.displayName,
    content: values.content,
  })
    .then(() => {
      toast.success('Хампт создан!')

      router.push('/posts')
    })
    .catch((error) => {
      toast.error('Что-то пошло не так! Ошибка в консоли браузера.')

      console.error(error)
    }).finally(() => {
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
      <textarea v-model="values.content" name="content" type="text" placeholder="Напишите что-нибудь!" class="textarea textarea-bordered" />
      <span class="text-error">{{ errors.content }}</span>
      <button type="submit" class="btn btn-primary" :class="{ loading: isLoading }" :disabled="isLoading">
        Хамптнуть
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>
