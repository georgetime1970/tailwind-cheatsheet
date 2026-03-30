import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "animate.css";
import "nprogress/nprogress.css";
import { MotionPlugin } from "@vueuse/motion";

const app = createApp(App);

app.use(MotionPlugin);

app.mount("#app");
