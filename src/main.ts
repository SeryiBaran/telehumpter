import { createApp } from 'vue'
import { defineRule } from 'vee-validate'

import App from './App.vue'
import router from './router'

import 'vue3-toastify/dist/index.css'
import './assets/main.css'

defineRule('confirmed', (value, [target]: [string], ctx) => {
  if (!!value && value === ctx.form[target])
    return true

  return 'Пароли должны совпадать!'
})

const app = createApp(App)

app.use(router)

app.mount('#app')
