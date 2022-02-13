<template>
  <el-form ref="ruleFormRef" :model="form" inline>
    <el-form-item label="商品id">
      <el-input :model="form.goods_id" placeholder="请输入商品id"></el-input>
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
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialog.update_current.dialog_visible" title="修改商品">
    <el-form :model="dialog.update_current.form" ref="updateCurrent" :rules="rules.update_current">
      <el-form-item label="商品名称" prop="goods_name">
        <el-input v-model="dialog.update_current.form.goods_name" placeholder="请输入商品名称" clearable />
      </el-form-item>
      <el-form-item label="商品分类" prop="goods_classification">
        <el-select
          v-model="dialog.update_current.form.goods_classification"
          placeholder="请选择商品分类"
          size="large"
          clearable
        >
          <el-option
            v-for="item in option.goods_classification_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="库存数量" prop="count">
        <el-input v-model="dialog.update_current.form.count" placeholder="请输入商品数量" clearable />
      </el-form-item>
      <el-form-item label="商品规格" prop="specifications">
        <el-input
          v-model="dialog.update_current.form.specifications"
          placeholder="请输入商品规格"
          clearable
        />
      </el-form-item>
      <el-form-item label="商品属性" prop="attribute">
        <el-input v-model="dialog.update_current.form.attribute" placeholder="请输入商品属性" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="confirmUpdateCurrent(updateCurrent)">确认</el-button>
      <el-button>取消</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElForm, ElNotification } from 'element-plus'

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

const rules = reactive({
  update_current: {
    goods_name: [{
      required: true,
      message: '请输入商品名称',
      trigger: 'blur',
    }],
    goods_classification: [{
      required: true,
      message: '请选择商品分类',
      trigger: 'blur',
    }],
    count: [{
      required: true,
      message: '请输入库存数量',
      trigger: 'blur',
    }],
    specifications: [{
      required: true,
      message: '请输入商品规格',
      trigger: 'blur',
    }],
    attribute: [{
      required: true,
      message: '请输入商品属性',
      trigger: 'blur',
    }]
  }
})

const dialog = reactive({
  update_current: {
    dialog_visible: false,
    form: {
      id: 1,
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

interface Row {
  id: string,
  goods_name: string,
  goods_classification: number,
  count: number,
  specifications: string,
  attribute: string
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

// 删除当前行
const delCurrentRow: (row: Row) => void = (row: Row): void => {
  const { id } = row
  table_data.forEach((res, index) => {
    if (Number(id) === res.id) {
      table_data.splice(index, 1)
    }
  })
}

// 更改当前行数据，按钮开关
const updateCurrentRow: (row: Row) => void = (row: Row) => {
  dialog.update_current.dialog_visible = true
  const { id, goods_classification, goods_name, count, specifications, attribute } = row
  dialog.update_current.form = {
    id: Number(id),
    goods_classification,
    goods_name,
    count,
    specifications,
    attribute
  }
}

type updateCurrent = InstanceType<typeof ElForm>
const updateCurrent = ref<updateCurrent>()
// 表单验证
const validateFrom: (updateCurrent: updateCurrent | undefined) => boolean = (formEl: updateCurrent | undefined): boolean => {
  let result_valid = false
  if (!formEl) return false
  formEl.validate((valid) => {
    if (valid)
      result_valid = valid
  })
  return result_valid
}

// 确认更改当前行数据
const confirmUpdateCurrent: (updateCurrent: updateCurrent | undefined) => void = (updateCurrent: updateCurrent | undefined): void => {
  if (validateFrom(updateCurrent)) {
    const id = dialog.update_current.form.id
    table_data.forEach(res => {
      if (res.id === id) {
        res.id = dialog.update_current.form.id
        res.goods_name = dialog.update_current.form.goods_name
        res.goods_classification = dialog.update_current.form.goods_classification
        res.count = dialog.update_current.form.count
        res.specifications = dialog.update_current.form.specifications
        res.attribute = dialog.update_current.form.attribute
      }
    })
    dialog.update_current.dialog_visible = false
  }
}

// 增加商品
const addGoods: () => void = (): void => {
  ElNotification({
    title: "添加成功",
    message: "添加商品成功",
    type: "success"
  })
  console.log("添加成功")
}

</script>

<style lang="scss" scoped>
.edit-button {
  float: right;
  margin: 30px 0px 10px 30px;
}
</style>
