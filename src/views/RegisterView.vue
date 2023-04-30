<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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
      .matches(/^[a-zA-Z0-9]+$/g, 'Это поле должно содержать только латинские буквы и цифры!')
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

useField('email')
useField('username')
useField('password')
useField('passwordRepeat')

const router = useRouter()

const isLoading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  const auth = getAuth()
  isLoading.value = true
  createUserWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
      toast.success('Регистрация прошла успешно!')
      const user = userCredential.user
      updateProfile(user, {
        displayName: values.username,
      }).then(() => {
        auth.updateCurrentUser(user)

        router.push('/')
      })
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
    <form class="max-w-xs w-full flex flex-col gap-2" @submit="onSubmit">
      <input
        v-model="values.email" name="email" type="text" placeholder="Ваш Email" class="input input-bordered"
        :class="{ 'input-error': !!errors.email }"
      >
      <span class="text-error">{{ errors.email }}</span>
      <input
        v-model="values.username" name="username" type="text" placeholder="Ваш ник" class="input input-bordered"
        :class="{ 'input-error': !!errors.username }"
      >
      <span class="text-error">{{ errors.username }}</span>
      <input
        v-model="values.password" name="password" type="password" placeholder="Ваш пароль"
        class="input input-bordered" :class="{ 'input-error': !!errors.password }"
      >
      <span class="text-error">{{ errors.password }}</span>
      <input
        v-model="values.passwordRepeat" name="passwordRepeat" type="password" placeholder="Повторите пароль"
        class="input input-bordered" :class="{ 'input-error': !!errors.passwordRepeat }"
      >
      <span class="text-error">{{ errors.passwordRepeat }}</span>
      <button type="submit" class="btn btn-primary" :class="{ loading: isLoading }" :disabled="isLoading">
        Зарегистрироваться
      </button>
    </form>
  </div>
</template>

<style scoped></style>
