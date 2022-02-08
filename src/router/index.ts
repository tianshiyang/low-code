import {createRouter,createWebHistory,RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'default',
    component: () => import("@/views/default/index.vue")
  },
  {
    path: "/menu",
    name: "menu",
    component: () => import("@/views/menu/index.vue")
  },
  {
    path: "/index",
    name: "index",
    component: () => import("@/views/index.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
