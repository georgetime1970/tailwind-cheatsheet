<template>
  <button
    @click="emits('action')"
    :aria-label="ariaLabel"
    :class="['duration-300 text-gray-500', value ? 'rotate-180' : 'rotate-0']"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      class="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
const { value, ariaLabel } = defineProps<{
  value: boolean;
  ariaLabel: string;
}>();

const emits = defineEmits(["action"]);
</script>
