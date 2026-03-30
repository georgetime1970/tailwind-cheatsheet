<template>
  <div
    class="font-roboto theme-bg flex min-h-screen flex-col tracking-wide lg:pt-16"
  >
    <SearchBar @search="search" :isInit="isInit" />
    <!-- <Tagline /> -->
    <div v-if="isInit" class="autoColumns my-5 px-2.5">
      <template v-for="item in data" :key="item.title">
        <Category :category="item" />
      </template>
    </div>
    <div
      v-else
      class="mt-8 flex flex-1 flex-col items-center justify-center py-5"
    >
      <Globule />
      <Loading />
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import nprogress from "nprogress";

import { onMounted, ref } from "vue";
import Category from "./components/Category.vue";
// import Footer from "./components/Footer.vue";
import Globule from "./components/Globule.vue";
import Loading from "./components/Loading.vue";
import SearchBar from "./components/SearchBar.vue";
// import Tagline from './components/Tagline.vue'

nprogress.configure({ easing: "ease", speed: 300, showSpinner: false });

let originJson: Category[] = [];
const data = ref<Category[]>([]);
const isInit = ref(false);

const search = (text: string) => {
  if (window.history?.pushState) {
    const { origin, pathname } = window.location;
    const newUrl = `${origin}${pathname}${text ? `?q=${text}` : ""}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  }
  let newCheatsheet = originJson.map((category: Category) => {
    if (category.title.toLowerCase().includes(text)) {
      return category;
    } else {
      return {
        title: category.title,
        content: category.content.map((subcategory: Subcategory) => {
          if (
            subcategory.title.toLowerCase().includes(text) ||
            subcategory.description.toLowerCase().includes(text)
          ) {
            return subcategory;
          } else {
            return {
              title: subcategory.title,
              docs: subcategory.docs,
              description: subcategory.description,
              table: subcategory.table.filter((tr) => {
                for (let td = 0; td < tr.length; td++) {
                  if (tr[td].includes(text)) {
                    return true;
                  }
                }
                return false;
              }),
            };
          }
        }),
      };
    }
  });
  data.value = newCheatsheet;
};

const getCheatsheet = async () => {
  try {
    nprogress.start();
    const res = await axios.get(
      "https://raw.githubusercontent.com/yuxinle1996/JsonApi/refs/heads/master/cheatsheet.json",
    );
    originJson = res.data;
    isInit.value = true;
  } catch {
  } finally {
    nprogress.done();
  }
};

onMounted(() => {
  getCheatsheet();
});
</script>

<style>
@reference "tailwindcss";

.autoColumns {
  @apply grid auto-rows-[5px] grid-cols-[repeat(auto-fill,100%)] items-start justify-between md:grid-cols-[repeat(auto-fill,calc(100%/2))] lg:grid-cols-[repeat(auto-fill,calc(100%/3))] xl:grid-cols-[repeat(auto-fill,calc(100%/4))];
}
</style>
