<template>
  <div
    class="theme-bg border-b border-gray-200 lg:fixed lg:top-0 lg:left-0 lg:z-30 lg:w-full dark:border-gray-700"
  >
    <div class="container mx-auto p-4">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-x-4"
      >
        <!-- logo标题 -->
        <div class="flex flex-col items-center sm:flex-row sm:justify-center">
          <div class="flex items-center">
            <img :src="logo" alt="logo" class="h-10 object-cover object-left" />
            <p class="ml-2 text-xl leading-10 text-gray-800 dark:text-gray-200">
              George的
              <strong>Tailwind</strong>
            </p>
          </div>
          <h1
            class="mt-2 flex items-center pl-2 text-lg text-gray-600 sm:ml-2 sm:border-l sm:border-gray-400 lg:mt-0 dark:border-gray-700 dark:text-gray-300"
          >
            速查表&nbsp;
            <span
              class="ml-2 flex h-5 items-center rounded-md bg-primary px-2 text-xs font-bold text-white dark:text-gray-900"
            >
              {{ tailwindVersion }}
            </span>
          </h1>
        </div>
        <!-- 搜索框 -->
        <div
          class="relative mt-4 h-10 sm:mx-auto sm:w-80 lg:m-0 xl:w-80 2xl:w-96"
        >
          <input
            ref="searchInputRef"
            class="peer theme-bg focus:ring-opacity-20 h-full w-full rounded-lg border border-gray-200 p-2 leading-6 text-gray-700 focus:border-primary focus:ring focus:ring-primary focus:outline-none dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-400 dark:focus:border-primary"
            type="text"
            placeholder="Search"
            v-model="searchValue"
          />
          <button
            v-if="searchValue"
            @click="clearInput"
            class="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <span
            v-else
            class="py- pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded-lg border px-2 py-1 text-xs text-gray-400 transition-all duration-300 peer-focus:opacity-0 dark:border-gray-700 dark:text-gray-400"
            >Ctrl k</span
          >
        </div>
        <!-- 操作按钮 -->
        <div
          class="mt-4 flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-center sm:space-y-0 sm:gap-x-3 lg:mt-0"
        >
          <button
            class="transform rounded-lg border px-4 py-2 text-sm text-gray-600 transition-colors duration-300 hover:bg-gray-100 focus:outline-none dark:border-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
            @click="emitter.emit('ui/expandAll')"
          >
            Expand
            <span class="lg:hidden xl:inline">All</span>
          </button>
          <button
            class="transform rounded-lg border px-4 py-2 text-sm text-gray-600 transition-colors duration-300 hover:bg-gray-100 focus:outline-none dark:border-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
            @click="emitter.emit('ui/collapseAll')"
          >
            Collapse
            <span class="lg:hidden xl:inline">All</span>
          </button>
          <!-- <a
            title="TailwindCSS"
            href="https://www.mida.vip"
            class="flex items-center justify-center h-10 px-4 text-sm font-medium text-center text-white transition-colors duration-300 transform rounded-md dark:text-gray-900 lg:h-10 bg-primary hover:bg-primary/70"
          >
            Back <span class="lg:hidden xl:inline">&nbsp;To Home</span>
          </a> -->
          <div class="flex items-center justify-center">
            <ToggleSwitch v-model="isChecked" />
          </div>
          <!-- <div class="flex items-center justify-center">
            <a
              class="flex w-fit items-center text-gray-700 hover:text-primary dark:text-gray-300"
              href="https://github.com/yuxinle1996/tailwind-cheatsheet-vue"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconGithub />
              <span
                class="under-animation-[1px] ml-1 text-sm duration-0 sm:hidden"
                >前往github仓库</span
              >
            </a>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/img/logo.ico";
// import IconGithub from "@/components/icons/IconGithub.vue";
import ToggleSwitch from "@/components/ToggleSwitch.vue";
import useTheme from "@/hooks/useTheme";
import emitter from "@/utils/bus";
import { onBeforeUnmount, onMounted, ref, watchEffect } from "vue";

const { isChecked } = useTheme();
const emits = defineEmits(["search"]);
const { isInit } = defineProps<{
  isInit: boolean;
}>();
const tailwindVersion = ref(import.meta.env.VITE_TAILWIND_VERSION || "unknown");
const useSearchParams = () => {
  return new URLSearchParams(window.location.search);
};
const query = useSearchParams().get("q") || "";
const searchValue = ref(query);
const searchInputRef = ref<HTMLInputElement | null>(null);
let searchTimer: number | null = null;

function clearSearch() {
  if (searchTimer !== null) {
    clearTimeout(searchTimer);
  }
}

const handleFocus = (e: KeyboardEvent) => {
  if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    searchInputRef.value?.focus();
  }

  if (e.key === "Escape") {
    searchInputRef.value?.blur();
  }
};

// 输入内容少于5个字符时，延迟搜索
watchEffect(() => {
  if (!isInit) return;
  clearSearch();
  if (searchValue.value.length < 5) {
    searchTimer = window.setTimeout(() => {
      emits("search", searchValue.value);
    }, 400);
  } else {
    emits("search", searchValue.value);
  }
});

const clearInput = () => {
  searchValue.value = "";
};

onMounted(() => {
  emits("search", query);
  document.addEventListener("keydown", handleFocus);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleFocus);
});
</script>

<style scoped></style>
