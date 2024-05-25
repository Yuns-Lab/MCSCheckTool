import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// Plugin
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
app.use(ElementPlus);

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount("#app");

// Theme Change Detector
const matchTheme = (e) => {
    if (e.matches) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
};
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", matchTheme);
matchTheme(window.matchMedia("(prefers-color-scheme: dark)"));

// Card Body AutoResizer
const resizer = () => {
    document.querySelectorAll(".el-card").forEach((el) => {
        const height = el.clientHeight;
        el.querySelector(".el-card__body").style.height = `${
            height - el.querySelector(".el-card__header").clientHeight - 40
        }px`;
    });
};
resizer();
window.addEventListener("resize", (_e) => {
    resizer();
});
