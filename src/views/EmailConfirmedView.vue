<script lang="ts" setup>
import { RoutesPaths } from '@/router/routes'
</script>

<template>
  <div class="hero grow">
    <div class="hero-content text-center">
      <div class="max-w-xl flex flex-col gap-12 items-center">
        <h1 class="text-4xl">Email подтвержден!</h1>
        <RouterLink class="btn btn-primary" :to="RoutesPaths.HOME"
          >На главную</RouterLink
        >
      </div>
    </div>
  </div>
</template>
