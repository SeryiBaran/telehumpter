<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { RoutesPaths } from '@/router/routes'
</script>

<template>
  <div class="hero grow">
    <div class="hero-content text-center">
      <div class="max-w-xl flex flex-col gap-12 items-center">
        <h1 class="text-4xl">Telehumpter</h1>
        <p>Скорее пиши всякую чушь!</p>
        <RouterLink class="btn btn-primary" :to="RoutesPaths.WORKBOX">
          Го го го!
        </RouterLink>
      </div>
    </div>
  </div>
</template>
