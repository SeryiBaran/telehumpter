<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import Link from '@/components/Link.vue'
import Input from '@/components/Input.vue'
import { RoutesPaths } from '@/router/routes'
import { useAuth } from '@/composables/useAuth'
import type { LoginForm } from '@/types'
import { loginFormSchema } from '@/yup/loginForm.schema'

const { loginWithPassword } = useAuth()

const { handleSubmit } = useForm<LoginForm>({
  validationSchema: loginFormSchema,
})

const isLoading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  loginWithPassword(values).finally(() => {
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
