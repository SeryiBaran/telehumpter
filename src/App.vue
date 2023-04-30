<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { computed } from 'vue'
import Link from './components/Link.vue'
import { randomPastelHSLByStr } from '@/utils'

const router = useRouter()
const currentUser = useCurrentUser()
const vuefireAuth = useFirebaseAuth()

const userAvatarLetter = computed(() => {
  const displayName = currentUser.value?.displayName
  if (displayName)
    return displayName[0]

  return 'U'
})

function logout() {
  vuefireAuth?.signOut().then(() => {
    router.push('/login')
  })
}
</script>

<template>
  <div class="bg-base-100 min-h-screen flex flex-col">
    <div class="flex">
      <div class="drawer drawer-mobile">
        <input id="my-drawer" type="checkbox" class="drawer-toggle">
        <div class="drawer-content flex flex-col">
          <header class="navbar bg-primary text-primary-content flex gap-2">
            <div class="flex-1">
              <label for="my-drawer" class="btn btn-square btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  class="inline-block w-5 h-5 stroke-current"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <Link class="btn btn-ghost normal-case text-xl" to="/">
                Telehumpter
              </Link>
              <div v-if="currentUser" class="dropdown dropdown-end ml-auto">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                  <div class="w-10 rounded-full">
                    <span
                      class="h-full text-white text-xl flex justify-center items-center"
                      :style="{ 'background-color': randomPastelHSLByStr(currentUser.uid) }"
                    >
                      {{ userAvatarLetter }}
                    </span>
                  </div>
                </label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-base-content">
                  <li>
                    <Link to="/settings">
                      Настройки
                    </Link>
                  </li>
                  <li>
                    <button @click="logout">
                      Выйти
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <main class="px-4 py-6 grow flex flex-col">
            <RouterView v-slot="{ Component }">
              <transition name="slide-fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </RouterView>
          </main>
        </div>
        <div class="drawer-side">
          <label for="my-drawer" class="drawer-overlay" />
          <ul class="menu p-4 w-80 bg-base-200 text-base-content flex flex-col gap-2">
            <li class="mb-4 lg:hidden">
              <label for="my-drawer">
                Закрыть это меню
              </label>
            </li>
            <li v-if="!currentUser">
              <Link to="/register">
                Регистрация
              </Link>
            </li>
            <li v-if="!currentUser">
              <Link to="/login">
                Вход
              </Link>
            </li>
            <li v-if="currentUser">
              <Link to="/workbox">
                Хамптнуть
              </Link>
            </li>
            <hr>
            <li>
              <Link to="https://github.com/SeryiBaran/telehumpter">
                Github проекта
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 300ms ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-5rem);
  opacity: 0;
}
</style>
