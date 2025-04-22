import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import DailyList from "../views/login-success.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/login-success",
    name: "DailyList",
    component: DailyList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
