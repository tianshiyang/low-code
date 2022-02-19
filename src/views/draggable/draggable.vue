<template>
  <page-title title="可拖拽的draggable" />
  <div class="page">
    <div class="line">单列拖拽</div>
    <draggable
      v-model="data.single_array"
      chosenClass="chosen"
      forceFallback="true"
      animation="1000"
      itemKey="id"
      @end="draggableEnd"
    >
      <template #item="{ element }">
        <div>{{ element.name }}</div>
      </template>
    </draggable>
    <div class="line">多列拷贝拖拽</div>
    <div class="draggable-box">
      <draggable
        class="draggable-item"
        :group="{ name: 'fruits', pull: 'clone' }"
        :sort="false"
        v-model="data.multi_column.group1"
        animation="300"
        itemKey="id"
        @end="draggableEnd"
      >
        <template #item="{ element }">
          <div>{{ element.name }}</div>
        </template>
      </draggable>
      <draggable
        class="draggable-item"
        v-model="data.multi_column.group2"
        :group="{ name: 'fruits', pull: '' }"
        animation="300"
        itemKey="id"
      >
        <template #item="{ element }">
          <div>{{ element.name }}</div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import PageTitle from '../../components/pubComponents/pageTitle.vue';
let data = reactive({
  single_array: [
    { id: 10, name: 'www.itxst.com' },
    { id: 20, name: 'www.baidu.com' },
    { id: 30, name: 'www.taobao.com' },
    { id: 40, name: 'www.yahoo.com' }],
  multi_column: {
    group1: [
      { id: 1, name: "苹果" },
      { id: 2, name: "梨" },
      { id: 3, name: "香蕉" },
      { id: 4, name: "西瓜" },
    ],
    group2: [
      { id: 1, name: "Apple" },
      { id: 2, name: "Pear" },
      { id: 3, name: "Banana" },
      { id: 4, name: "watermelon" },
    ]
  }
})

// 拖拽结束事件
const draggableEnd: () => void = (): void => {
  console.log(data.multi_column.group2)
}
</script>

<style lang="scss" scoped>
.page {
  margin: 20px;

  .chosen {
    background-color: aquamarine;
  }

  .line {
    background-color: beige;
    margin: 20px 0;
  }

  .draggable-box {
    display: flex;
  }

  .draggable-item {
    border: 1px solid #eeeeee;
    padding: 20px;
    margin: 50px;
  }
}
</style>

