<script lang="ts" setup>
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = withDefaults(defineProps<{
  initialValue?: string
  name: string
  placeholder?: string
}>(), {
  initialValue: '',
  placeholder: '',
})

const name = toRef(props, 'name')

const { value, errorMessage, errors } = useField(props.name, undefined, {
  initialValue: props.initialValue,
})
</script>

<template>
  <div class="wrapper">
    <input
      v-model="value" :name="name" type="text" :placeholder="props.placeholder" class="input input-bordered"
      :class="{ 'input-error': errors.length > 0 }"
    >
    <span class="text-error text-xs">{{ errorMessage }}</span>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col gap-1 min-h-[5rem];
}
</style>
