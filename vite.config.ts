import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import postcssPresetEnv from "postcss-preset-env";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  console.log(env);
  return {
    base: "./",
    plugins: [
      vue({
        // template: {
        //   compilerOptions: {
        //     isCustomElement: (tag: string) => tag.startsWith("wc-flow"),
        //   },
        // },
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      postcss: {
        plugins: [postcssPresetEnv()],
      },
    },
  };
});
