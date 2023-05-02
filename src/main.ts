import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { defineRule } from 'vee-validate'

import App from './App.vue'
import router from './router'

import 'vue3-toastify/dist/index.css'
import './assets/main.css'

// TODO: пофиксить
// @ts-expect-error `Type 'any[] | Record<string, any>' must have a '[Symbol.iterator]()' method that returns an iterator.`
defineRule('confirmed', (value, [target], ctx) => {
  if (!!value && value === ctx.form[target])
    return true

  return 'Пароли должны совпадать!'
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
