<template>
  <div class="box">
    <div class="login-box">
      <el-tabs v-model="active_name_form.active_name" class="demo-tabs">
        <el-tab-pane label="登陆" name="login">
          <LoginCom @getUserInfo="getUserInfo"></LoginCom>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">register</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from "vue-router"
import LoginCom from './loginCom.vue';
import { login } from "../../api/index"
let active_name_form = reactive({
  active_name: "login",
})
const router = useRouter()

interface UserLogin {
  user_name: String,
  password: String
}


const getUserInfo: (user_info: UserLogin) => void = (user_info: UserLogin): void => {
  login(user_info).then(res => {
    localStorage.setItem("token", "token")
    router.push({
      path: "/default"
    })
  })
}
</script>
<style scoped lang="scss">
.box {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background: cornflowerblue;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 50vw;
    height: 60vh;
    background: #ffffff;
    border-radius: 10px;
  }
  .el-tabs__nav-scroll {
    overflow: hidden;
    position: relative;
    left: 40%;
    font-size: 20px;
  }
  .el-tabs__item {
    font-size: 20px;
  }
}
</style>
