<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import Input from '@/components/Input.vue'
import type { RegisterForm } from '@/types'
import { registerFormSchema } from '@/yup/registerForm.schema'
import { useAuth } from '@/composables/useAuth'

const { register } = useAuth()

const { handleSubmit } = useForm<RegisterForm>({
  validationSchema: registerFormSchema,
})

const isLoading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  register(values).finally(() => {
    isLoading.value = false
  })
})
</script>

<template>
  <div class="grow flex flex-col gap-12 justify-center items-center">
    <h1 class="text-4xl">Регистрация</h1>
    <form class="max-w-xs w-full flex flex-col gap-1" @submit="onSubmit">
      <Input name="email" placeholder="Ваш Email" />
      <Input name="username" placeholder="Ваш ник" />
      <Input name="password" placeholder="Ваш пароль" />
      <Input name="passwordRepeat" placeholder="Повторите пароль" />
      <button
        type="submit"
        class="btn btn-primary"
        :class="{ loading: isLoading }"
        :disabled="isLoading"
      >
        Зарегистрироваться
      </button>
    </form>
  </div>
</template>
