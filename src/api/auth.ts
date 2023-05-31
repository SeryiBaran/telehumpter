import { toast } from 'vue3-toastify'
import { supabase } from '@/lib/supabaseInit'
import router from '@/router'
import { RoutesPaths } from '@/router/routes'
import type { LoginForm, RegisterForm } from '@/types'

// TODO: пофиксить успешную регистрацию при указании зарегестрированного email
// Почему-то data.error null
export async function register(values: RegisterForm) {
  const auth = supabase.auth

  return auth
    .signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          username: values.username,
        },
      },
    })
    .then(async (data) => {
      console.log(data)
      if (!data.error) {
        if (data.data.user)
          await supabase
            .from('profiles')
            .insert({ id: data.data.user.id, username: values.username })
      } else {
        throw data.error || new Error('Что-то случилось...')
      }
    })
    .then(() => {
      toast.success(
        'Регистрация прошла успешно! Не забудьте подтвердить Email!'
      )

      router.push(RoutesPaths.LOGIN)

      return true
    })
    .catch((error: Error & { status: string }) => {
      const message = error.message

      if (message.includes('exists')) {
        toast.error('Email уже зарегестрирован!')
      } else if (message.includes('invalid')) {
        toast.error('Неверные данные!')
      } else {
        toast.error('Что-то пошло не так! Ошибка в консоли браузера.')
      }

      console.error(error)
      return false
    })
}

export async function loginWithPassword(values: LoginForm) {
  const auth = supabase.auth
  return auth
    .signInWithPassword({
      email: values.email,
      password: values.password,
    })
    .then((data) => {
      if (!data.error) {
        toast.success('Вход выполнен!')

        const currentRoute = router.currentRoute.value

        let redirectTo: string = RoutesPaths.HOME

        if (typeof currentRoute.query.redirect === 'string')
          redirectTo = currentRoute.query.redirect

        router.push(redirectTo)
      } else {
        throw data.error
      }
    })
    .catch((error: Error & { status: string }) => {
      const message = error.message
      const status = error.status

      console.error(message)
      console.error(status)

      if (message.includes('confirm')) {
        toast.error('Email не подтвержден!')
      } else if (message.includes('invalid')) {
        toast.error('Неверные данные!')
      } else {
        toast.error('Что-то пошло не так! Ошибка в консоли браузера.')
      }

      console.error(error)
    })
}

export async function logout() {
  return supabase.auth.signOut().then(() => {
    router.push(RoutesPaths.LOGIN)
  })
}
