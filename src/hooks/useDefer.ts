import { onUnmounted, ref } from "vue";

export function useDefer(maxCount: number) {
  const frameCount = ref(0);
  let rafId: number;

  const updateFrameCount = () => {
    rafId = requestAnimationFrame(() => {
      frameCount.value++;
      if (frameCount.value >= maxCount) return;
      updateFrameCount();
    });
  };

  updateFrameCount();
  onUnmounted(() => {
    cancelAnimationFrame(rafId);
  });

  return function defer(n: number) {
    return frameCount.value >= n;
  };
}
