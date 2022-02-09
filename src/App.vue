
<script setup lang="ts">
import emun from "@/views/menu/index.vue"
const token = localStorage.getItem("token")
</script>

<template>
  <emun v-if="token"></emun>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
