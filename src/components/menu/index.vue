<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-demo"
    :collapse="collapse"
    router
    text-color="#fff"
  >
    <el-submenu index="list">
      <template #title>
        <el-icon>
          <shop />
        </el-icon>
        <span>列表页</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/good-list">商品列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="draggable">
      <template #title>
        <el-icon>
          <shop />
        </el-icon>
        <span>第三方组件库</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/draggable">拖拽列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { Shop } from '@element-plus/icons'

let store = useStore()
let collapse = computed((): boolean => {
  return store.state.collapse
})

</script>

<style scoped lang="scss">
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 95vh;
}
</style>
