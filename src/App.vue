<template>
  <router-view />
</template>

<script setup lang="ts">
  // import {ref} from "vue"
  // let token = ref(localStorage.getItem("token"))

  // window.addEventListener("setItemEvent", () => {
  //   setTimeout(() => {
  //     let localToken = localStorage.getItem("token")
  //     if (localToken !== null) {
  //       token.value = localToken
  //     }
  //   })
  // })

  // window.addEventListener("clearItemEvent", () => {
  //   setTimeout(() => {
  //     token.value = ""
  //   })
  // })
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0
}
body {
  margin: 0 8px;
}
.el-main {
  padding: 0;
  flex: 1;
}
</style>
