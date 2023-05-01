<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import TheDrawer from './components/TheDrawer.vue'
</script>

<template>
  <div class="bg-base-100 min-h-screen flex flex-col">
    <div class="flex">
      <TheDrawer>
        <template #pageContent>
          <TheHeader />
          <main class="px-4 py-6 grow flex flex-col">
            <RouterView v-slot="{ Component }">
              <transition name="slide-fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </RouterView>
          </main>
        </template>
      </TheDrawer>
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
