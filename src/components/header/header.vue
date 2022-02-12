<template>
  <div class="header">
    <div class="header-left">
      <div class="collapse-btn" @click="collapseChage">
        <el-icon v-if="collapse">
          <d-arrow-right />
        </el-icon>
        <el-icon v-else>
          <d-arrow-left />
        </el-icon>
      </div>
      <div class="logo">后台管理系统</div>
    </div>

    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <div>{{ user }}</div>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="signOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { DArrowLeft, DArrowRight } from '@element-plus/icons'
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()

let collapse = computed((): boolean => { return store.state.collapse })
const collapseChage: () => void = () => {
  store.commit("changeCollapse")
}

type User = string | null
const user: User = localStorage.getItem("token")

// 退出
const signOut: () => void = () => {
  localStorage.clear()
  router.push({
    path: "/login"
  })

}
</script>

<style lang="scss">
.header,
.header-left {
  box-sizing: border-box;
  display: flex;
  height: 70px;
  width: 100%;
  color: #ffffff;
  background-color: #242f42;
  align-items: center;
  padding: 0 30px;

  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }

  .el-dropdown-link {
    color: #ffffff;
    display: flex;
  }
}
</style>
