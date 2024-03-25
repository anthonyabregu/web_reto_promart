import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Toasted from "vue-toasted";
//import dotenv from "dotenv";

// Carga las variables de entorno desde el archivo .env
//dotenv.config();

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Notifications from "vue-notification";
// import Toast from "toastr";
// import 'toastr/build/toastr.min.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(Notifications);
Vue.use(Toasted);

// Access the loaded token from the environment (if defined)
const token = process.env.VUE_APP_TOKEN;
import axios from "axios";

if (token) {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
