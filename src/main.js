import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/tailwind.css";
import VueApexCharts from "vue3-apexcharts";
import http from './plugins/http.js'
import pinia  from './store/pinia.js'
createApp(App)
  .use(router)
  .use(http)
  .use(pinia)
  .use(VueApexCharts)
  .mount("#app");
