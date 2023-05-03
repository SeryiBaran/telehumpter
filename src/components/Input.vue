<script lang="ts" setup>
import { computed, ref, toRef, watch } from 'vue'
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

const isValid = computed(() => errors.value.length === 0)

// если юзать в тексте ошибки просто errorMessage, transform не будет срабатывать (почему? хз)
const persistedErrorMessage = ref('')

watch(errorMessage, (newMessage) => {
  if (newMessage && newMessage?.trim() !== '')
    persistedErrorMessage.value = newMessage
})
</script>

<template>
  <div class="wrapper">
    <input
      v-model="value" :name="name" type="text" :placeholder="props.placeholder" class="outline-transparent input input-bordered"
      :class="{ 'input-error': !isValid }"
    >

    <span class="text-error text-xs">
      <Transition name="errorTransition">
        <span v-if="!isValid" class="block">{{ persistedErrorMessage }}</span>
      </Transition>
    </span>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col gap-1 min-h-[5rem];
}

.input {
  transition-property: outline-color, border-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}

.errorTransition-enter-active,
.errorTransition-leave-active {
  transition: all 200ms ease-in-out;
}

.errorTransition-enter-from,
.errorTransition-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}
</style>
