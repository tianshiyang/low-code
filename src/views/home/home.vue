<template>
  <div class="app-box">
    <vHeader></vHeader>
    <el-container>
      <el-aside :style="collapse ? 'width: 50px' : 'width: 200px'">
        <v-menu></v-menu>
      </el-aside>
      <el-main>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="keep_alive_route.includes(route_path)" />
          </keep-alive>
          <component :is="Component" v-if="!keep_alive_route.includes(route_path)" />
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import vMenu from "@/components/menu/index.vue"
import vHeader from "@/components/header/header.vue"
import { useStore } from "vuex";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute()
const route_path = computed((): string => route.path)
// 保持当前路由状态的列表
const keep_alive_route = ["/good-list"]

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
