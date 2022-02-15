<template>
  <el-dialog v-model="modelValue" :title="title" @close="handleDialogClose(addGoods)">
    <el-form ref="addGoods" :model="add_form" :rules="rules">
      <el-form-item label="商品名称" prop="goods_name">
        <el-input v-model="add_form.goods_name" placeholder="请输入商品名称" clearable />
      </el-form-item>
      <el-form-item label="商品分类" prop="goods_classification">
        <el-select
          v-model="add_form.goods_classification"
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
        <el-input v-model.number="add_form.count" placeholder="请输入商品数量" clearable />
      </el-form-item>
      <el-form-item label="商品规格" prop="specifications">
        <el-input v-model="add_form.specifications" placeholder="请输入商品规格" clearable />
      </el-form-item>
      <el-form-item label="商品属性" prop="attribute">
        <el-input v-model="add_form.attribute" placeholder="请输入商品属性" clearable />
      </el-form-item>
      <el-form-item v-if="!can_callback">
        <div style="color: red">数量不能为0</div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="commitNewGoods(addGoods)">提交</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { defineProps, reactive, ref, watch } from 'vue';
import type { ElForm } from "element-plus"
type FormInstance = InstanceType<typeof ElForm>
const addGoods = ref<FormInstance>()

defineProps({
  modelValue: Boolean,
  title: String
})

// form表单model数据
const add_form = reactive({
  goods_name: "",
  goods_classification: 1,
  count: 1,
  specifications: "",
  attribute: ""
})

// 下拉框选项
const option = reactive({
  goods_classification_options: [{
    label: "生活用品",
    value: 0
  }, {
    label: "鞋",
    value: 1

  }]
})

// 表单校验规则
const rules = reactive({
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
  }, {
    type: "number",
    message: "请输入数字",
    trigger: "blur"
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
})

// 接口表单提交项
interface EditGoodsForm {
  id?: number,
  goods_name: string,
  goods_classification: number,
  count: number,
  specifications: string,
  attribute: string
}

// 接口时间回掉
interface EmitType {
  (event: 'handleCloseDialog'): void
  (event: "handleAddGoods", addform: EditGoodsForm): void
}
const emit = defineEmits<EmitType>()

// 监听count属性，为0不触发回掉
let can_callback = ref(true)
watch(() => add_form.count, (newV, oldV) => {
  if (!newV) {
    can_callback.value = false
  } else {
    can_callback.value = true
  }
})

// 提交更改商品列表回掉事件
const commitNewGoods: (formEl: FormInstance | undefined) => void = (formEl: FormInstance | undefined): void => {
  if (!can_callback.value) {
    return
  }
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      emit("handleAddGoods", add_form)
    }
  })
}

// 取消更改商品回掉
const handleDialogClose: (formEl: FormInstance | undefined) => void = (formEl: FormInstance | undefined): void => {
  emit("handleCloseDialog")
  if (!formEl) return
  formEl.resetFields()
}
</script>
