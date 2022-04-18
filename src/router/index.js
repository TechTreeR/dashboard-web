import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login-page.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main-page.vue"),
    children: [
      {
        path: "my-lessons",
        component: () => import("@/views/main/my-lessons/my-lessons.vue"),
      },
      {
        path: "my-space",
        component: () => import("@/views/main/my-space/my-space.vue"),
      },
      {
        path: "pick-lessons",
        component: () => import("@/views/main/pick-lessons/pick-lessons.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/not-found/not-found.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// 导航守卫
router.beforeEach((to) => {
  console.log(to);
  // if (to.path !== "/login") {
  //   //const info = store.getters.login.getUserInfo();
  //   console.log("before");
  //   //console.log(info);
  //   // if (!info) {
  //   //   return "/login";
  //   // }
  // }
});
export default router;
