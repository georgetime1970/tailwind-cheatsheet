<template>
  <div
    class="fixed z-50 p-4 m-4 font-medium text-white rounded-lg shadow-lg top-20 right-6 bg-primary"
    role="alert"
  >
    <p class="text-sm">"{{ text }}" 复制到剪贴板</p>
  </div>
</template>

<script setup lang="ts">
const { text } = defineProps<{
  text: string;
}>();
</script>
