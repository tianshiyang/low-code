<template>
  <div class="box" v-if="token">
    <div class="menu">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-demo"
        default-active="2"
        text-color="#fff">
        <el-sub-menu index="1">
          <template #title>
            <span>列表页</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="goList('/index')">商品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </div>
    <section class="section">
      <router-view />
    </section>
  </div>
  <div v-else>
    <Login></Login>
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router';
import { ref } from "vue";
import Login from '../login/login.vue';
const token = ref(localStorage.getItem("token"))

const router = useRouter()
const goList = (path: string): void => {
  router.push({
    path
  })
}
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100vh;
  display: flex;

  .menu {
    overflow: scroll;

    header {
      height: 30px;
    }

    .el-menu-demo:not(.el-menu--collapse) {
      width: 220px;
    }

    .el-menu-demo {
      min-height: 95%;
      box-sizing: border-box;
      padding-bottom: 50px;
    }
  }

  .section {
    flex: 1;
    overflow: hidden;
  }
}
</style>
