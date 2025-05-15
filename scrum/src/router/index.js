import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import DailyList from "../views/login-success.vue";
import AddDaily from "../views/AddDaily.vue";
import info from "../views/info.vue";
import NotFound from "../views/NotFound.vue";

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
    meta: { requiresAuth: true }, 
  },
  {
    path: "/add-daily",
    name: "AddDaily",
    component: AddDaily,
    meta: { requiresAuth: true }, 
  },
  {
    path: "/info",
    name: "info",
    component: info,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
})

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = !!localStorage.getItem("token"); 

//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next({ name: "Login" }); 
//   } else if (to.name === "Login" && isAuthenticated) {
//     next({ name: "DailyList" }); 
//   } else {
//     next();
//   }
// });

export default router;
