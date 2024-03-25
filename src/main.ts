import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Toasted from "vue-toasted";

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
//Vue.use(Toast);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
