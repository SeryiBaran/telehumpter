<script lang="ts" setup>
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRoute, useRouter } from 'vue-router'
import { getCurrentUser, useFirebaseAuth } from 'vuefire'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import Link from '@/components/Link.vue'

const router = useRouter()
const route = useRoute()

interface LoginForm {
  email: string
  password: string
}

const { handleSubmit, errors, values } = useForm<LoginForm>({
  validationSchema: {
    email: yup
      .string()
      .required('Это поле обязательно!')
      .email('Это поле должно содержать Email!'),
    password: yup
      .string()
      .required('Это поле обязательно!'),
  },
})

useField('email')
useField('password')

// const onSubmit = handleSubmit(async () => {
//   const firebaseAuth = useFirebaseAuth()
//   let redirectTo = '/'
//   if (typeof route.query.redirect === 'string')
//     redirectTo = route.query.redirect

//   toast.success('Вход выполнен!')
//   router.push(redirectTo)
//   // console.log(values)
// })

const isLoading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  const vuefireAuth = useFirebaseAuth()
  const auth = getAuth()
  isLoading.value = true
  signInWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
      toast.success('Вход выполнен!')

      const user = userCredential.user
      vuefireAuth?.updateCurrentUser(user)

      let redirectTo = '/'
      if (typeof route.query.redirect === 'string')
        redirectTo = route.query.redirect

      router.push(redirectTo)
    })
    .catch((error) => {
      toast.error('Что-то пошло не так! Ошибка в консоли браузера.')

      console.error(error)
    }).finally(() => {
      isLoading.value = false
    })
})

onMounted(async () => {
  const currentUser = await getCurrentUser()

  if (currentUser) {
    let redirectTo = '/'
    if (typeof route.query.redirect === 'string')
      redirectTo = route.query.redirect

    router.push(redirectTo)
  }
})
</script>

<template>
  <div class="grow flex flex-col gap-12 justify-center items-center">
    <h1 class="text-4xl">
      Вход
    </h1>
    <form class="max-w-xs w-full flex flex-col gap-2" @submit="onSubmit">
      <input v-model="values.email" name="email" type="text" placeholder="Ваш ник" class="input input-bordered">
      <span class="text-error">{{ errors.email }}</span>
      <input
        v-model="values.password" name="password" type="password" placeholder="Ваш пароль"
        class="input input-bordered"
      >
      <span class="text-error">{{ errors.password }}</span>
      <button type="submit" class="btn btn-primary" :class="{ loading: isLoading }" :disabled="isLoading">
        Войти
      </button>
      <Link to="/register" class="link">
        Ещё не зарегестрированы?
      </Link>
    </form>
  </div>
</template>

<style scoped></style>
