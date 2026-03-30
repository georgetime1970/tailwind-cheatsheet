import { ref, watchEffect } from "vue";

type Theme = "light" | "dark" | "system";
const LOCAL_KEY = "__theme__";
const theme = ref<Theme>((localStorage.getItem(LOCAL_KEY) as Theme) || "light");

/*
// css 媒体查询
@media (prefers-color-scheme: light) {}

 */

// js 是否匹配媒体查询
const match = matchMedia("(prefers-color-scheme: dark)");
// console.log(match.matches); // 如果符合条件，则返回true

function followSystem() {
  document.documentElement.dataset.theme = match.matches ? "dark" : "light";

  // document.documentElement.classList.toggle(
  //   "dark",
  //   theme.value === "dark" || (theme.value === "system" && match.matches)
  // );
}

watchEffect(() => {
  localStorage.setItem(LOCAL_KEY, theme.value);
  if (theme.value === "system") {
    followSystem();
    match.addEventListener("change", followSystem);
  } else {
    // 根据theme的值，切换class, 如果theme的值是dark，则切换dark类，否则切换light类
    // document.documentElement.classList.remove("light", "dark");
    // document.documentElement.classList.add(theme.value);

    // 使用data-theme属性
    // document.documentElement.setAttribute("data-theme", theme.value);
    document.documentElement.dataset.theme = theme.value;

    match.removeEventListener("change", followSystem);
  }
});

export default function useTheme() {
  return {
    theme,
  };
}
