<template>
  <PageTitle title="添加商品">
    <template #btn>
      <el-button type="primary">添加商品列表</el-button>
    </template>
  </PageTitle>
  <div class="form-style add-form">
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
    </el-form>
    <el-form>
      <el-button v-if="tips" type="primary">提交</el-button>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import PageTitle from '../../components/pubComponents/pageTitle.vue';

const add_form = reactive({
  goods_name: "",
  goods_classification: 1,
  count: 0,
  specifications: "",
  attribute: ""
})

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

let tips = ref(false)

watch(() => add_form.goods_classification, (newV, oldV) => {
  if (newV === 0) {
    tips.value = true
  } else {
    tips.value = false
  }
})
</script>
<style lang="scss" scoped>
.add-form {
  position: relative;
  left: 50%;
  transform: translate(-50%, 20px);
  width: 400px;
}
</style>
