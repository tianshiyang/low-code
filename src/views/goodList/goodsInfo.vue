<template>
  <div class="box">
    <el-form clase="form-style">
      <el-form-item label="商品id">{{ state.goods_info.id }}</el-form-item>
      <el-form-item label="商品名称">{{ state.goods_info.warehouse_name }}</el-form-item>
      <!-- <el-form-item label="司机列表"></el-form-item> -->
    </el-form>
    <div class="title">司机列表</div>
    <el-button style="float: right;" type="primary" size="small" @click="toggleSelection">全部清除</el-button>
    <el-table
      ref="multipleTableRef"
      :data="state.goods_info.logistics_order_list"
      :header-cell-style="{ background: '#eef1f6' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column property="driver_id" label="司机id"></el-table-column>
      <el-table-column property="driver_name" label="司机名称"></el-table-column>
      <el-table-column label="司机手机号">
        <template #default="scope">
          <el-button type="text">{{ scope.row.driver_phone }}</el-button>
        </template>
      </el-table-column>
      <el-table-column property="logistics_company_name" label="物流公司"></el-table-column>
      <el-table-column property="logistics_order_status_name" label="当前物流状态"></el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { ElTable } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getGoodsInfo } from "../../api/index";
const route = useRoute()
const { id } = route.params

let state = reactive({
  goods_info: <any>Array
})

const getGoodinfo: (id: number) => void = (id: number) => {
  let params = { id }
  getGoodsInfo(params).then((res) => {
    state.goods_info = res.list[0]
  })
}
getGoodinfo(Number(id))

interface LogisticsInfo {
  logistics_company_name: string
  driver_name: string
  driver_id: number
  driver_phone: string
}

// 表格勾选状态改变
const handleSelectionChange = (val: LogisticsInfo[]) => {
  console.log(111)
  console.log(val)
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const toggleSelection: () => void = (): void => {
  multipleTableRef.value?.clearSelection()
}
</script>

<style lang="scss" scoped>
.box {
  margin: 10px;

  .title {
    margin: 20px;
    font-weight: 600;
    font-size: 20px;
  }
}
</style>
