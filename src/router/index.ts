import {createRouter,createWebHistory,RouteRecordRaw} from 'vue-router'
import home from "@/views/home/home.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: "/default"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/",
    name: "home",
    component: home,
    children: [{
      path: "/default",
      name: "default",
      component: () => import("@/views/default/index.vue")
    }, {
      path: "/good-list",
      name: "goodList",
      component: () => import("@/views/goodList/index.vue")
    }, {
      path: "/goods-info/:id",
      name: "goodsInfo",
      component: () => import("@/views/goodList/goodsInfo.vue")
    }, {
      path: "/draggable",
      name: "draggable",
      component: () => import("@/views/draggable/draggable.vue")
    }, {
      path: "/echarts",
      name: "echarts",
      component: () => import("@/views/echarts/echarts.vue")
    }]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
