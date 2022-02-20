<template>
  <div class="page">
    <div class="simple-box">
      <el-button class="simple-btn" type="primary">简单折线图</el-button>
      <div id="simple" class="simple"></div>
    </div>
    <div class="simple-box">
      <div class="simple-btn">在数据点处显示数值</div>
      <div id="dataSimple" class="simple"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, reactive } from 'vue';

onMounted(() => {
  let doc: HTMLElement = document.getElementById("simple")!
  let simple_line = echarts.init(doc)
  setOptions(simple_line, options.simple)

  let dataSimpleDoc: HTMLElement = document.getElementById("dataSimple")!
  let dataSimple = echarts.init(dataSimpleDoc)
  setOptions(dataSimple, options.data_line)
})

let options = reactive({
  simple: {
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150],
        type: 'line'
      }
    ]
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
.page {
  display: flex;
  justify-content: space-between;
  .simple-box {
    width: 500px;
    height: 500px;
    .simple-btn {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    .simple {
      width: 500px;
      height: 500px;
    }
  }
}
</style>
