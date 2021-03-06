import { createApp } from 'vue'
import store from './store/index'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import "./assets/css/index.scss"
import draggable from 'vuedraggable'
import MyButton from './plugins/myButton/index'


const app = createApp(App)
app.component("myButton", MyButton)
// vue全局挂载第三方组件库
app.component('draggable', draggable)


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
