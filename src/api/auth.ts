import { toast } from 'vue3-toastify'
import { supabase } from '@/lib/supabaseInit'
import router from '@/router'
import { RoutesPaths } from '@/router/routes'
import type { LoginForm, RegisterForm } from '@/types'

export async function register(values: RegisterForm) {
  const auth = supabase.auth
  try {
    const data = await auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          username: values.username,
        },
      },
    })
    if (data.data.user)
      await supabase
        .from('profiles')
        .insert({ id: data.data.user.id, username: values.username })
    else throw data.error || new Error('data.user после регистрации пуст!')
    toast.success('Регистрация прошла успешно! Не забудьте подтвердить Email!')
    router.push(RoutesPaths.LOGIN)
  } catch (error) {
    toast.error('Что-то пошло не так! Ошибка в консоли браузера.')

    console.error(error)
  }
}

export async function loginWithPassword(values: LoginForm) {
  const auth = supabase.auth
  return auth
    .signInWithPassword({
      email: values.email,
      password: values.password,
    })
    .then((data) => {
      if (data.error) {
        const lowerCasedError = data.error.message.toLowerCase()

        if (lowerCasedError.includes('confirm')) {
          toast.error('Email не подтвержден!')
        } else if (lowerCasedError.includes('invalid')) {
          toast.error('Неверные данные!')
        } else {
          toast.error('Что-то пошло не так! Ошибка в консоли браузера.')
        }

        console.error(data.error)
      } else {
        toast.success('Вход выполнен!')

        const currentRoute = router.currentRoute.value

        let redirectTo: string = RoutesPaths.HOME

        if (typeof currentRoute.query.redirect === 'string')
          redirectTo = currentRoute.query.redirect

        router.push(redirectTo)
      }
    })
}

export async function logout() {
  return supabase.auth.signOut().then(() => {
    router.push(RoutesPaths.LOGIN)
  })
}
