<template>
  <div class="app-box">
    <vHeader></vHeader>
    <el-container>
      <el-aside :style="collapse ? 'width: 50px' : 'width: 200px'">
        <v-menu></v-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import vMenu from "@/components/menu/index.vue"
import vHeader from "@/components/header/header.vue"
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore()
const collapse = computed((): boolean => {
  return store.state.collapse
})
</script>
<style lang="scss">
.app-box {
  height: 100%;

  .el-main {
    padding: 0;
  }
}
</style>
