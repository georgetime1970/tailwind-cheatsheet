<template>
  <section class="theme-bg lg:pt-24">
    <TypeWriter
      class="pt-6 text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 transition-colors duration-300"
      :text="['Tailwind CSS 速查表']"
      :charDuration="150"
      :typingDelay="3000"
      :deletingDelay="1000"
      :deleteSpeed="0.5"
    />
    <p class="max-w-6xl px-4 md:text-lg mx-auto mt-4 text-base text-center text-gray-500 dark:text-gray-400">
      使用此交互式备忘单快速查找所有类名和 CSS 属性。这是您唯一需要的 Tailwind 备忘单！
    </p>
    <div class="w-full flex justify-center my-4">
      <Terminal class="h-52 border-gray-200 bg-gray-800 text-white dark:bg-gray-100" middleClass="border-gray-200">
        <TypingAnimation class="dark:text-gray-700" text="> pnpm install tailwindcss @tailwindcss/vite -D" :delay="0" :duration="50" />

        <AnimatedSpan delay="2500" class="text-green-500">
          <span>✔ Packages: +8</span>
        </AnimatedSpan>

        <AnimatedSpan delay="3000" class="text-green-500">
          <span>✔ ++++++++</span>
        </AnimatedSpan>

        <AnimatedSpan delay="3500" class="text-green-500">
          <!-- Tailwind CSS已经准备就绪   用英文 -->
          <span>✔ Tailwind CSS is ready</span>
        </AnimatedSpan>
        <TypingAnimation class="text-muted-foreground dark:text-gray-700" text="开始你的Tailwind CSS之旅吧🤗" :delay="4000" :duration="50" />
      </Terminal>
    </div>
  </section>
</template>

<script lang="ts" setup>
import AnimatedSpan from '@/components/Terminal/AnimatedSpan.vue'
import Terminal from '@/components/Terminal/Terminal.vue'
import TypingAnimation from '@/components/Terminal/TypingAnimation.vue'
import TypeWriter from '@/components/TypeWriter.vue'
</script>
