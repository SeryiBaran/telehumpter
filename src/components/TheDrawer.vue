<script lang="ts" setup>
import { useCurrentUser } from 'vuefire'
import Link from './Link.vue'

const currentUser = useCurrentUser()
</script>

<template>
  <div class="drawer drawer-mobile">
    <input id="my-drawer" type="checkbox" class="drawer-toggle">
    <div class="drawer-content flex flex-col">
      <slot name="pageContent" />
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
</template>

<style scoped>

</style>
