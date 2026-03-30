<template>
  <Transition
    appear
    name="animate__animated animate__bounce"
    enter-active-class="animate__fadeIn"
    leave-active-class="animate__fadeOut"
  >
    <div
      ref="categoryRef"
      class="mx-2.5 rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden transition-colors duration-300"
    >
      <div
        class="flex justify-center items-center font-bold text-gray-800 dark:bg-gray-700 dark:text-gray-200 transition-colors duration-300 tracking-wider bg-gray-200 rounded-md px-3 py-2 mx-3 mt-3 mb-2"
      >
        <h1 class="grow">{{ category.title }}</h1>
        <ArrowDown
          :value="isOpen"
          @action="isOpen = !isOpen"
          :ariaLabel="`${isOpen ? 'Close' : 'Open'} ${category.title} category`"
        />
      </div>
      <template
        v-for="(subcategory, index) in category.content"
        :key="subcategory.title"
      >
        <SubCategory
          v-if="isOpen && subcategory.table.length"
          :subcategory="subcategory"
        />
      </template>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import SubCategory from "./SubCategory.vue";
import ArrowDown from "./ArrowDown.vue";

const { category } = defineProps<{
  category: Category;
}>();
const isOpen = ref(true);
const categoryRef = ref<HTMLElement>();

onMounted(() => {
  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const rows = Math.ceil(entry.contentRect.height / 5) + 4;
      (categoryRef.value as HTMLElement).style.gridRowEnd = `span ${rows}`;
    });
  });
  observer.observe(categoryRef.value as HTMLElement);
});
</script>

<style scoped></style>
