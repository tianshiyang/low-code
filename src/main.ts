import { createApp } from 'vue'
import store from './store/index'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import "./assets/css/index.scss"

const app = createApp(App)
router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token") === null) {
     if (to.path !== "/login") {
       router.push({
        path: "/login"
      })
    } else {
      next()
    }
  } else {
    next()
  }

})
app.use(router).use(store).use(ElementPlus).mount('#app')
