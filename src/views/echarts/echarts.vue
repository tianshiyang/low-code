<template>
  <page-title class="page-title" :title="`echarts图标 --- ${getEchartsType}`"></page-title>
  <el-tabs v-model="echarts_type" type="border-card" class="demo-tabs">
    <el-tab-pane label="柱状图" name="Histogram">
      <histogram></histogram>
    </el-tab-pane>
    <el-tab-pane label="折线图" name="LineChart">
      <line-chart></line-chart>
    </el-tab-pane>
    <el-tab-pane label="饼图" name="PieChart">
      <pie-chart></pie-chart>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import histogram from "./components/histogram.vue"
import PageTitle from '../../components/pubComponents/pageTitle.vue';
import { computed, ref } from "vue";
import LineChart from "./components/lineChart.vue";
import PieChart from "./components/pieChart.vue";

const getEchartsType = computed(() => {
  switch (echarts_type.value) {
    case "Histogram":
      return "柱状图"
    case "LineChart":
      return "折线图"
    case "PieChart":
      return "饼图"
  }
})

let echarts_type = ref("Histogram")

</script>

<style lang="scss" scoped>
:deep(.el-tabs__content) {
  height: 86vh;
}
</style>
