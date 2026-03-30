<template>
  <div
    :class="[
      'z-0 w-full max-w-lg rounded-xl border bg-background overflow-hidden flex flex-col',
      className,
    ]"
  >
    <div :class="['flex flex-col gap-y-2 border-b p-4 shrink-0', middleClass]">
      <div class="flex flex-row gap-x-2">
        <div class="h-2 w-2 rounded-full bg-red-500"></div>
        <div class="h-2 w-2 rounded-full bg-yellow-500"></div>
        <div class="h-2 w-2 rounded-full bg-green-500"></div>
      </div>
    </div>
    <div class="overflow-hidden flex-1">
      <div class="h-full p-4">
        <code class="grid gap-y-1">
          <slot />
        </code>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { className = "", middleClass = "" } = defineProps<{
  /** 容器样式 */
  className?: string;
  /** 中间区域样式 */
  middleClass?: string;
}>();
</script>
