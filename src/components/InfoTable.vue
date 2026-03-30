<template>
  <Toast v-show="showToast" :text="toastText" />
  <table class="w-full mb-4 bg-gray-100 rounded dark:bg-gray-900">
    <tbody>
      <tr
        class="border-b border-gray-300 dark:border-gray-700"
        v-for="(tr, index) in table"
        :key="index"
      >
        <td
          :class="[
            'cursor-copy font-mono text-xs hover:underline p-2',
            {
              'text-purple-700 dark:text-purple-300 whitespace-nowrap':
                index === 0,
              'text-blue-700 dark:text-blue-300': index === 1,
              'text-gray-500 dark:text-gray-300 text-xs': index === 2,
            },
          ]"
          v-for="(text, index) in tr"
          :key="index"
          @click="copyText(text)"
        >
          <div
            v-show="text.includes('rgb(') || text === 'transparent'"
            class="w-6 h-6 border rounded"
            :style="{
              backgroundColor: text.includes('rgb(') ? text : 'transparent',
            }"
          />
          <div
            v-show="text === 'current color'"
            class="w-6 h-6 bg-white border rounded"
          ></div>
          <p
            v-show="
              !text.includes('rgb(') &&
              text !== 'transparent' &&
              text !== 'current color'
            "
          >
            <template v-for="subtext in text.split('\n')" :key="subtext">{{
              subtext
            }}</template>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { copyTextToClipboard } from "@/utils/copyTextToClipboard";
import Toast from "@/components/Toast.vue";

const showToast = ref(false);
const toastText = ref("");
const { table } = defineProps<{
  table: string[][];
}>();

const copyText = async (text: string) => {
  const result = await copyTextToClipboard(text);
  if (result) {
    toastText.value = text;
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  } else {
    toastText.value = "复制失败";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  }
};
</script>
