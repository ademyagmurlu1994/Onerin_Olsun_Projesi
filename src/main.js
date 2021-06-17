import Vue from 'vue'
import App from './App.vue'
import { store } from "./store/store"
import VueRouter from "vue-router"
import { routes } from "./routes";
import axios from "axios";

window.axios=axios;
Vue.use(VueRouter);

const router = new VueRouter({
  routes, // routes: routes
  mode: 'history' // hash default
})

//v-color
Vue.directive("color", {

});

new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App)
})
