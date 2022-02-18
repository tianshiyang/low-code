<template>
  <el-form>
    <el-form-item label="商品id">{{ state.goods_info }}</el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getGoodsInfo } from "../../api/index";
const route = useRoute()
const { id } = route.params

let state = reactive({
  goods_info: <any>[]
})

const getGoodinfo: (id: number) => void = (id: number) => {
  let params = { id }
  getGoodsInfo(params).then((res) => {
    state.goods_info = res.list
  })
}
getGoodinfo(Number(id))
</script>
