<template>
  <el-form ref="formRef" :rules="login_form.rules" :model="login_form" label-width="120px">
    <el-form-item label="用户名" prop="user_name">
      <el-input style="width: 200px" v-model="login_form.user_name" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        style="width: 200px"
        v-model="login_form.password"
        type="password"
        placeholder="请输入密码"
        show-password
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="goLogin(formRef)">登陆</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { ElForm } from 'element-plus'

type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>()

let login_form = reactive({
  user_name: "",
  password: "",
  rules: {
    user_name: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
      }, {
        min: 3,
        message: '用户名长度最小三位',
        trigger: 'blur'
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur',
      }, {
        min: 8,
        max: 16,
        message: '请输入8到16位密码',
        trigger: 'blur'
      },
    ]
  }
})
interface EmitType {
  (
    e: "getUserInfo",
    user_info: {
      user_name: String,
      password: String
    }
  ): void

}
const emit = defineEmits<EmitType>()
const goLogin = (formEl: FormInstance | undefined): void => {
  if (formEl) {
    formEl.validate(valid => {
      if (valid) {
        emit("getUserInfo", {
          user_name: login_form.user_name,
          password: login_form.password
        })
      }
    })
  }
}
</script>
