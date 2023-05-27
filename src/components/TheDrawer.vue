<script lang="ts" setup>
import Link from './Link.vue'
import { useAuth } from '@/composables/useAuth'
import { RoutesPaths } from '@/router/routes'

const { isAuthorized } = useAuth()
</script>

<template>
  <div class="drawer drawer-mobile">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <slot name="pageContent" />
    </div>
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay" />
      <ul
        class="menu p-4 w-80 bg-base-200 text-base-content flex flex-col gap-2"
      >
        <li class="mb-4 lg:hidden">
          <label for="my-drawer"> Закрыть это меню </label>
        </li>
        <li v-if="!isAuthorized">
          <Link :to="RoutesPaths.REGISTER">Регистрация</Link>
        </li>
        <li v-if="!isAuthorized">
          <Link :to="RoutesPaths.LOGIN">Вход</Link>
        </li>
        <li v-if="isAuthorized">
          <Link :to="RoutesPaths.WORKBOX">Хамптнуть</Link>
        </li>
        <li>
          <Link :to="RoutesPaths.POSTS">Хампты</Link>
        </li>
        <hr />
        <li>
          <Link to="https://github.com/SeryiBaran/telehumpter">
            Github проекта
          </Link>
        </li>
      </ul>
    </div>
  </div>
</template>
