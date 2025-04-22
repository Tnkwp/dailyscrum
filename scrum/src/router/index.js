import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";


const routes = [
    {
    path: "/",
    name: "Login",
    component: Login,
}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
