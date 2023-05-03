<script lang="ts" setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { supabase } from '@/lib/supabaseInit'
import Input from '@/components/Input.vue'

interface RegisterForm {
  email: string
  username: string
  password: string
  passwordRepeat: string
}

const { handleSubmit, errors, values } = useForm<RegisterForm>({
  validationSchema: {
    email: yup
      .string()
      .required('Это поле обязательно!')
      .email('Это поле должно содержать Email!'),
    username: yup
      .string()
      .required('Это поле обязательно!')
      .matches(/^[a-zA-Z0-9]+$/g, 'Это поле должно содержать только a-Z и 0-9!')
      .min(4, 'Это поле должно быть не менее 4 символов!')
      .max(18, 'Это поле должно быть не более 18 символов!'),
    password: yup
      .string()
      .required('Это поле обязательно!')
      .min(8, 'Это поле должно быть не менее 8 символов!')
      .max(36, 'Это поле должно быть не более 36 символов!'),
    passwordRepeat: 'confirmed:password',
  },
})

const router = useRouter()

const isLoading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  const auth = supabase.auth
  isLoading.value = true
  auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        username: values.username,
      },
    },
  }).then(async (data) => {
    await supabase.from('profiles').insert({ id: data.data.user?.id, username: values.username })
  })
    .then(() => {
      toast.success('Регистрация прошла успешно! Не забудьте подтвердить Email!')
      router.push('/login')
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
  <div class="grow flex flex-col gap-12 justify-center items-center">
    <h1 class="text-4xl">
      Регистрация
    </h1>
    <form class="max-w-xs w-full flex flex-col gap-1" @submit="onSubmit">
      <Input name="email" placeholder="Ваш Email" />
      <Input name="username" placeholder="Ваш ник" />
      <Input name="password" placeholder="Ваш пароль" />
      <Input name="passwordRepeat" placeholder="Повторите пароль" />
      <button type="submit" class="btn btn-primary" :class="{ loading: isLoading }" :disabled="isLoading">
        Зарегистрироваться
      </button>
    </form>
  </div>
</template>

<style scoped></style>
