import MyButton from "./src/index.vue"

MyButton.install = function(Vue: any) {
  Vue.component(MyButton.name, MyButton)
}

export default MyButton

