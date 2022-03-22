<template>
  <button class="my-button" @click="click">
    <slot></slot>
  </button>
  <div>{{ prop.modelValue }}</div>
</template>>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue"

const prop = defineProps({
  modelValue: {
    type: String
  }
})

interface EmitType {
  (event: "update:modelValue", value: string): void
  (event: "click"): void
}

const emit = defineEmits<EmitType>()

const click = (): void => {
  emit("click")
  emit("update:modelValue", prop.modelValue!)
}
</script>

<style lang="scss" scoped>
.my-button {
  color: red
}
</style>
