/**
 * 防抖
 * @param fn 函数
 * @param delay 延迟时间
 * @returns
 */
export const debounce = (fn: Function, delay: number) => {
  let timer: number = 0;
  return function (this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

/**
 * 节流
 * @param fn 函数
 * @param delay 延迟时间
 * @returns
 */
export const throttle = (fn: Function, delay: number) => {
  let lastTime: number = 0;
  return function (this: any, ...args: any[]) {
    const now = Date.now();
    if (now - lastTime > delay) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
};
