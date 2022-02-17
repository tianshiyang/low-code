<template>
  <page-title title="商品列表" />
  <div class="form-style">
    <el-form ref="ruleFormRef" :model="form" inline>
      <el-form-item label="商品id">
        <el-input v-model="form.goods_id" placeholder="请输入商品id"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="form.goods_classification" placeholder="请选择商品分类" size="large">
          <el-option
            v-for="item in option.goods_classification_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>

  <div class="edit-button">
    <el-button type="primary" size="small" @click="addGoods">增加商品</el-button>
  </div>

  <el-table :data="table_data" style="width: 100%;" :header-cell-style="{ background: '#eef1f6' }">
    <el-table-column align="center" prop="id" width="150" label="商品id" />
    <el-table-column align="center" prop="goods_name" width="200" label="商品名称" />
    <el-table-column align="center" prop="goods_classification" width="200" label="商品分类">
      <template #default="scope">{{ goodsClassification(scope.row) }}</template>
    </el-table-column>
    <el-table-column align="center" prop="count" label="库存数量" />
    <el-table-column align="center" prop="specifications" width="400px" label="商品规格" />
    <el-table-column align="center" prop="attribute" width="400" label="商品属性" />
    <el-table-column align="center" fixed="right" width="150" label="操作">
      <template #default="scope">
        <el-button type="danger" size="small" @click="delCurrentRow(scope.row)">删除</el-button>
        <el-button type="warning" size="small" @click="updateCurrentRow(scope.row)">更改</el-button>
        <el-button type="info" size="small" @click="router.push('/add-goods')">详情</el-button>
      </template>
    </el-table-column>
  </el-table>

  <EditGoods
    v-if="dialog.update_current.dialog_visible"
    v-model="dialog.update_current.dialog_visible"
    :prop-default-data="dialog.update_current.form"
    title="添加商品"
    @handleCloseDialog="handleClose"
    @handleAddGoods="handleAddGoods"
  />
</template>

<script lang="ts" setup>
import { onActivated, reactive } from "vue";
import { ElForm } from 'element-plus'
import PageTitle from "../../components/pubComponents/pageTitle.vue";
import EditGoods from "../../components/busComponents/editGoods.vue";
import { test } from "../../api";
import { useRouter } from "vue-router";
const router = useRouter()
onActivated(() => {
  getMockData()
})

interface IdGoodsInfo {
  id: number,
  goods_name: string,
  goods_classification: number,
  count: number,
  specifications: string,
  attribute: string
}

// 模拟数据接口
const getMockData: () => void = (): void => {
  test({})
}

const form = reactive({
  goods_id: "",
  goods_classification: ""
});

const option = reactive({
  goods_classification_options: [{
    label: "生活用品",
    value: 0
  }, {
    label: "鞋",
    value: 1
  }]
})

const dialog = reactive({
  update_current: {
    dialog_visible: false,
    form: {
      id: -1,
      goods_classification: 1,
      goods_name: "",
      count: 0,
      specifications: "",
      attribute: ""
    }
  }
})

let table_data = reactive([
  {
    id: 1,
    goods_name: "牙刷",
    goods_classification: 0,
    count: 100,
    specifications: "菲尔普斯专用电动牙刷，长度15cm，电池可用300小时，软毛，深度清洁",
    attribute: "电池可拆卸，软毛极度清洁，深度呵护牙龈"
  }, {
    id: 2,
    goods_name: "阿迪男鞋",
    goods_classification: 1,
    count: 50,
    specifications: "阿迪达斯专用男款跑鞋，超强弹力，跑步提速，1km只需10秒，赶超刘翔，直冲世界冠军",
    attribute: "全码，女36-44， 男40-46"
  }
])


// 更换商品类别
const goodsClassification: (row: IdGoodsInfo) => string = (row: IdGoodsInfo): string => {
  let str = "", { goods_classification } = row
  switch (goods_classification) {
    case 0:
      str = "生活用品"
      break;
    case 1:
      str = "鞋"
      break
  }
  return str
}

// 删除当前行
const delCurrentRow: (row: IdGoodsInfo) => void = (row: IdGoodsInfo): void => {
  const { id } = row
  table_data.forEach((res, index) => {
    if (id === res.id) {
      table_data.splice(index, 1)
    }
  })
}

// 更改当前行数据，按钮开关
const updateCurrentRow: (row: IdGoodsInfo) => void = (row: IdGoodsInfo) => {
  const { id, goods_classification, goods_name, count, specifications, attribute } = row
  dialog.update_current.form = {
    id,
    goods_classification,
    goods_name,
    count,
    specifications,
    attribute
  }
  dialog.update_current.dialog_visible = true
}

// 增加商品
const addGoods: () => void = (): void => {
  getMockData()
  dialog.update_current.dialog_visible = true
}

// 关闭对话框回掉
const handleClose = (): void => {
  dialog.update_current.dialog_visible = false
  dialog.update_current.form.goods_classification = 1
  dialog.update_current.form.goods_name = ""
  dialog.update_current.form.id = -1
  dialog.update_current.form.attribute = ""
  dialog.update_current.form.specifications = ""
  dialog.update_current.form.count = 0
}

// 提交数据回掉
const handleAddGoods: (callback_goods: IdGoodsInfo) => void = (callback_goods: IdGoodsInfo) => {
  const { goods_classification, goods_name, count, specifications, attribute } = callback_goods
  // 存在id证明是更改
  if (callback_goods.id !== -1) {
    table_data.forEach((res: IdGoodsInfo, index: number) => {
      if (res.id === callback_goods.id) {
        table_data[index].attribute = callback_goods.attribute
        table_data[index].count = callback_goods.count
        table_data[index].specifications = callback_goods.specifications
        table_data[index].goods_classification = callback_goods.goods_classification
        table_data[index].goods_name = callback_goods.goods_name
      }
    })
    handleClose()
    return
  }
  // id： 表格数据最后一项id + 1
  let id: number = table_data[table_data.length - 1].id + 1
  table_data.push({
    id,
    goods_classification,
    goods_name,
    count,
    specifications,
    attribute
  })
  handleClose()
}
</script>

<style lang="scss" scoped>
.edit-button {
  float: right;
  margin: 30px 0px 10px 30px;
}
</style>
