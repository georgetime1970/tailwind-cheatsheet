<template>
  <component
    :is="as"
    ref="elementRef"
    class="text-sm font-normal tracking-tight inline-flex items-center"
    :class="className"
  >
    {{ displayedText }}
    <span
      v-if="showCursor && isTyping"
      class="typing-cursor ml-0.5 text-sm"
      :class="{ blinking: isTypingActive }"
      >|</span
    >
  </component>
</template>

<script lang="ts" setup>
import { ref, onUnmounted, watch, computed } from "vue";

const {
  text,
  className = "",
  duration = 60,
  delay = 0,
  as = "span",
  showCursor = true,
  keepCursorAfterFinish = false,
} = defineProps<{
  /** 文本 */
  text: string;
  /** 容器样式 */
  className?: string;
  /** 每个字符的间隔时间(毫秒) */
  duration?: number | string;
  /** 开始前的延迟(毫秒) */
  delay?: number | string;
  /** 组件类型 */
  as?: string;
  /** 是否显示光标 */
  showCursor?: boolean;
  /** 打字完成后是否保留光标 */
  keepCursorAfterFinish?: boolean;
}>();

const displayedText = ref("");
const started = ref(false);
const isTyping = ref(false); // 是否正在打字
const isTypingActive = ref(false); // 打字是否正在进行中
const elementRef = ref(null);
let typingInterval: number;

// 开始打字效果
const startTyping = () => {
  let i = 0;
  displayedText.value = "";
  isTyping.value = true;
  isTypingActive.value = true;

  typingInterval = setInterval(() => {
    if (i < text.length) {
      displayedText.value = text.substring(0, i + 1);
      i++;
    } else {
      isTypingActive.value = false;
      if (!keepCursorAfterFinish) {
        isTyping.value = false;
      }
      clearInterval(typingInterval);
    }
  }, +duration);
};

// 延迟后开始动画
const startTimeout = setTimeout(() => {
  started.value = true;
  startTyping();
}, +delay);

// 监听文本变化
watch(
  () => text,
  (newText) => {
    if (started.value) {
      clearInterval(typingInterval);
      startTyping();
    }
  }
);

// 组件卸载时清理
onUnmounted(() => {
  clearInterval(typingInterval);
  clearTimeout(startTimeout);
});
</script>

<style scoped>
.typing-cursor {
  opacity: 1;
  height: 1em;
  display: inline-block;
}

.blinking {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
