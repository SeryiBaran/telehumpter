<script lang="ts" setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  to: string
}>()

const isExternalLink = computed(() => typeof props.to === 'string' && props.to.startsWith('http'))
</script>

<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <RouterLink v-else v-slot="{ isActive, href, navigate }" v-bind="$props" custom>
    <!-- TODO: пофиксить `Type 'ComputedRef<string>' is not assignable to type 'string'.` -->
    <a v-bind="$attrs" :href="href" :class="{ active: isActive }" @click="navigate">
      <slot />
    </a>
  </RouterLink>
</template>
