<script lang="ts" setup>
import Link from './Link.vue'
import Avatar from './Avatar.vue'
import { RoutesPaths } from '@/router/routes'
import { useAuth } from '@/composables/useAuth'
import { logout } from '@/api/auth'

const { currentUser: user, isAuthorized } = useAuth()
</script>

<template>
  <header class="navbar bg-primary text-primary-content flex gap-2">
    <div class="flex-1">
      <label for="my-drawer" class="btn btn-square btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-5 h-5 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
      <Link class="btn btn-ghost normal-case text-xl" to="/">
        Telehumpter
      </Link>
      <div v-if="isAuthorized && user" class="dropdown dropdown-end ml-auto">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <Avatar :user-nick="user.user_metadata.username || 'user'" />
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-base-content"
        >
          <li>
            <Link :to="RoutesPaths.SETTINGS"> Настройки </Link>
          </li>
          <li>
            <button @click="logout">Выйти</button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
