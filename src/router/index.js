import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import PublicFormView from "../views/PublicFormView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/public-form",
      name: "publicForm",
      component: PublicFormView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },

    // otherwise redirect to home
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("token");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  return next();
});

// router.beforeEach(async (to) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ["/login", "/register"];
//   const authRequired = !publicPages.includes(to.path);
//   const authStore = localStorage.getItem("user");

//   if (authRequired && !authStore) {
//     return "/login";
//   }

//   return to;
// });

export default router;
