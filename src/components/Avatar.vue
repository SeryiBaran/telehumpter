<script lang="ts" setup>
import { computed } from 'vue'
import { getUpperFirstLetter, randomPastelHSLByStr } from '@/utils'

const props = defineProps<{
  userNick?: string
}>()

const nick = computed(() => props.userNick || 'user')
const letter = computed(() => getUpperFirstLetter(nick.value))
</script>

<template>
  <div class="w-10 h-10 rounded-full overflow-hidden">
    <span
      class="h-full text-white text-xl flex justify-center items-center"
      :style="{ 'background-color': randomPastelHSLByStr(nick) }"
    >
      {{ letter }}
    </span>
  </div>
</template>
