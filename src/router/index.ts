import {createRouter,createWebHistory,RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import("@/views/default/index.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/default",
    name: "default",
    component: () => import("@/views/default/index.vue")
  },
  {
    path: "/good-list",
    name: "goodList",
    component: () => import("@/views/index.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
