<template>
  <Transition
    appear
    name="animate__animated animate__bounce"
    :duration="{ enter: 500, leave: 0 }"
    :enter-active-class="!isVisible ? 'animate__headShake' : ''"
    :leave-active-class="!isVisible ? 'animate__headShake' : ''"
  >
    <div>
      <div
        class="flex items-center px-3 py-2 text-gray-700 transition-colors duration-300 transform border-gray-300 cursor-pointer dark:hover:bg-gray-600 dark:text-gray-300 hover:bg-gray-200 hover:text-gray-900 dark:hover:text-gray-100"
        @click="isVisible = !isVisible"
      >
        <h1 class="flex-1 text-sm tracking-wider">{{ subcategory.title }}</h1>
        <a
          class="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-400 rounded-md dark:bg-gray-700 hover:bg-primary dark:hover:bg-primary"
          :href="subcategory.docs"
          target="_blank"
          rel="noopener noreferrer"
          @click.native.stop
        >
          文档
        </a>
      </div>
      <div
        class="bg-gray-200 dark:bg-gray-700 px-4 overflow-hidden"
        v-if="isVisible"
      >
        <p
          class="my-3 font-semibold leading-tight text-gray-800 dark:text-gray-200"
        >
          {{ subcategory.description }}
        </p>
        <InfoTable :table="subcategory.table" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watchEffect } from "vue";
import InfoTable from "@/components/InfoTable.vue";
import emitter from "@/utils/bus";

const { subcategory } = defineProps<{
  subcategory: Subcategory;
}>();
const isVisible = ref(false);

// 如果表格数据为空，则自动隐藏
watchEffect(() => {
  if (!subcategory.table.length) {
    isVisible.value = false;
  }
});

onMounted(() => {
  emitter.on("ui/expandAll", () => {
    isVisible.value = true;
  });
  emitter.on("ui/collapseAll", () => {
    isVisible.value = false;
  });
});
</script>
