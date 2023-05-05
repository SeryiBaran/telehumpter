<script lang="ts" setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  to: string
}>()

const isExternalLink = computed(
  () => typeof props.to === 'string' && props.to.startsWith('http')
)
</script>

<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <RouterLink v-else active-class="active" v-bind="$props">
    <slot />
  </RouterLink>
</template>
