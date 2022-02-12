<template>
  <el-form ref="ruleFormRef" :model="form" inline>
    <el-form-item label="商品id">
      <el-input :model="form.goods_id" placeholder="请输入商品id"></el-input>
    </el-form-item>
    <el-form-item label="商品分类">
      <el-select v-model="form.goods_classification" placeholder="请选择商品分类" size="large">
        <el-option
          v-for="item in form.goods_classification_options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>

  <el-table :data="table_data" style="width: 100%;">
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
        <el-button type="text">删除</el-button>
        <el-button type="text">删除</el-button>
        <el-button type="text">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const form = reactive({
  goods_id: "",
  goods_classification: "",
  goods_classification_options: [{
    label: "生活用品",
    value: 0
  }, {
    label: "鞋",
    value: 1
  }]
});

const table_data = reactive([
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

interface Row {
  id: string,
  goods_name: string,
  goods_classification: number
}

const goodsClassification: (row: Row) => string = (row: Row): string => {
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

</script>
