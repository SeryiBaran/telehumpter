<script lang="ts" setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import Link from '@/components/Link.vue'
import Input from '@/components/Input.vue'
import { supabase } from '@/lib/supabaseInit'
import { RoutesPaths } from '@/router/routes'

interface LoginForm {
  email: string
  password: string
}

const router = useRouter()
const route = useRoute()

const { handleSubmit } = useForm<LoginForm>({
  validationSchema: {
    email: yup
      .string()
      .required('Это поле обязательно!')
      .email('Это поле должно содержать Email!'),
    password: yup.string().required('Это поле обязательно!'),
  },
})

const isLoading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  const auth = supabase.auth
  isLoading.value = true
  auth
    .signInWithPassword({
      email: values.email,
      password: values.password,
    })
    .then((data) => {
      if (data.error) {
        switch (data.error.message) {
          case 'Invalid login credentials':
            toast.error('Неверные данные!')
            break

          default:
            toast.error('Что-то пошло не так! Ошибка в консоли браузера.')
            break
        }

        console.error(data.error)
      } else {
        toast.success('Вход выполнен!')

        let redirectTo: string = RoutesPaths.HOME
        if (typeof route.query.redirect === 'string')
          redirectTo = route.query.redirect

        router.push(redirectTo)
      }

      isLoading.value = false
    })
})
</script>

<template>
  <div class="grow flex flex-col gap-12 justify-center items-center">
    <h1 class="text-4xl">Вход</h1>
    <form class="max-w-xs w-full flex flex-col gap-1" @submit="onSubmit">
      <Input name="email" placeholder="Ваш Email" />
      <Input name="password" placeholder="Ваш пароль" />
      <button
        type="submit"
        class="btn btn-primary"
        :class="{ loading: isLoading }"
        :disabled="isLoading"
      >
        Войти
      </button>
      <Link :to="RoutesPaths.REGISTER" class="link">
        Ещё не зарегестрированы?
      </Link>
    </form>
  </div>
</template>

<style scoped></style>
