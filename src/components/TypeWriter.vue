<template>
  <div :class="['font-mono', className]">
    <span>{{ displayText }}</span>
    <span
      class="border-r-2 border-r-current animate-blink"
      :class="{ 'opacity-0': !showCursor }"
    ></span>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const {
  text,
  charDuration = 100,
  className = "",
  loop = true,
  typingDelay = 500,
  deletingDelay = 500,
  deleteSpeed = 0.5,
} = defineProps<{
  /** 要显示的文字，可以是字符串或字符串数组 */
  text: string | string[];
  /** 单个字符的打字间隔时间(ms) */
  charDuration?: number;
  /** 自定义样式类 */
  className?: string;
  /** 是否循环 */
  loop?: boolean;
  /** 打字完成后的延迟时间(ms) */
  typingDelay?: number;
  /** 删除完成后的延迟时间(ms) */
  deletingDelay?: number;
  /** 删除速度相对于打字速度的比例 (0-1) */
  deleteSpeed?: number;
}>();

const texts = computed(() => {
  return Array.isArray(text) ? text : [text];
});

const currentTextIndex = ref(0);
const currentText = computed(() => texts.value[currentTextIndex.value]);
const displayText = ref("");
const isTyping = ref(true);
const showCursor = ref(true);
let timer: number;

// 打字效果
const typeWriter = () => {
  let i = 0;
  const text = currentText.value;

  const typing = () => {
    if (i < text.length) {
      displayText.value = text.substring(0, i + 1);
      i++;
      timer = setTimeout(typing, charDuration);
    } else {
      // 打字完成，等待后开始删除
      if (loop || currentTextIndex.value < texts.value.length - 1) {
        setTimeout(() => {
          isTyping.value = false;
          deleteText();
        }, typingDelay);
      }
    }
  };

  typing();
};

// 删除效果
const deleteText = () => {
  let i = displayText.value.length;

  const deleting = () => {
    if (i > 0) {
      displayText.value = displayText.value.substring(0, i - 1);
      i--;
      timer = setTimeout(deleting, charDuration * deleteSpeed);
    } else {
      // 删除完成，切换到下一个文本或重新开始
      if (loop) {
        currentTextIndex.value =
          (currentTextIndex.value + 1) % texts.value.length;
      } else if (currentTextIndex.value < texts.value.length - 1) {
        currentTextIndex.value++;
      }

      setTimeout(() => {
        isTyping.value = true;
        typeWriter();
      }, deletingDelay);
    }
  };

  deleting();
};

// 光标闪烁效果
const cursorBlink = () => {
  const blink = () => {
    showCursor.value = !showCursor.value;
    timer = setTimeout(blink, 500);
  };
  blink();
};

onMounted(() => {
  cursorBlink();
  typeWriter();
});

onUnmounted(() => {
  clearTimeout(timer);
});
</script>

<style>
.animate-blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from,
  to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
