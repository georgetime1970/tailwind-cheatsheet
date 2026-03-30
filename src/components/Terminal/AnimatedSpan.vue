<template>
  <div
    v-motion="animationConfig"
    class="grid text-sm font-normal tracking-tight"
    :class="className"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const { delay = 0, className = "" } = defineProps<{
  /** 延迟时间 */
  delay?: number | string;
  /** 容器样式 */
  className?: string;
}>();

const animationConfig = computed(() => ({
  initial: {
    opacity: 0,
    y: -5,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 300,
      delay: +delay,
    },
  },
}));
</script>
