<template>
  <div id="pieChart" ref="pieChart" class="pie-chart"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, reactive } from 'vue';

onMounted(() => {
  let doc: HTMLElement = document.getElementById("pieChart")!
  let pieChart = echarts.init(doc)
  setOptions(pieChart, options.simple)
})

let options = reactive({
  simple: {
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 335,
            name: '直接访问'
          },
          {
            value: 234,
            name: '联盟广告'
          },
          {
            value: 1548,
            name: '搜索引擎'
          }
        ]
      }]
  },
  data_line: {
    xAxis: {
      data: ['A', 'B', 'C', 'D', 'E']
    },
    yAxis: {},
    series: [
      {
        data: [10, 22, 28, 23, 19],
        type: 'line',
        label: {
          show: true,
          position: 'bottom',
          textStyle: {
            fontSize: 20
          }
        }
      }
    ]

  }
})

// echarts 添加配置
let setOptions: (el: echarts.ECharts, options: any) => void = (el: echarts.ECharts, options: any): void => {
  el.setOption(options)
}
</script>

<style lang="scss" scoped>
.pie-chart {
  width: 500px;
  height: 500px;
}
</style>
