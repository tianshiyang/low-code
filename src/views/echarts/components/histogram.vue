<template>
  <div class="page">
    <div class="histogram-box">
      <el-button class="histogram-btn" type="primary" @click="changeHistogram">改变单柱状图数据</el-button>
      <div id="histogram" class="histogram"></div>
    </div>
    <div class="histogram-box">
      <div class="histogram-btn">多系列柱状图</div>
      <div id="multiSeries" class="histogram"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import * as echarts from "echarts"

let echarts_options = reactive({
  single: {
    histogram_echarts: <unknown>null,
    x_axis_data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  }
})

onMounted(() => {
  let doc: HTMLElement = document.getElementById("histogram")! // 非空断言
  let histogram_echarts = echarts.init(doc)
  echarts_options.single.histogram_echarts = histogram_echarts
  setOptions(histogram_echarts, [[120, 200, 150, 80, 70, 110, 130]])
  let multiSeriesDoc: HTMLElement = document.getElementById("multiSeries")!
  let multiSeries = echarts.init(multiSeriesDoc)
  setOptions(multiSeries, [[120, 200, 150, 80, 70, 110, 130], [100, 110, 120, 130, 140, 150, 160]])
})

// 异步改变柱状图数据
let setOptions: (histogram_echarts: echarts.ECharts, series: Array<Array<number>>) => void = (histogram_echarts: echarts.ECharts, series: Array<Array<number>>): void => {
  let series_options = series.map(res => {
    return {
      data: res,
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(220, 220, 220, 0.8)'
      }
    }
  })
  histogram_echarts.setOption({
    xAxis: {
      type: 'category',
      data: echarts_options.single.x_axis_data
    },
    yAxis: {
      type: 'value'
    },
    series: series_options
  })
}

// 改变单柱状图
let changeHistogram: () => void = (): void => {
  setTimeout(() => {
    setOptions(<echarts.ECharts>echarts_options.single.histogram_echarts, [[100, 110, 120, 130, 140, 150, 160]])
  }, 1000);
}
</script>

<style scoped lang="scss">
.page {
  display: flex;
  justify-content: space-between;
  .histogram-box {
    width: 500px;
    height: 500px;
    .histogram-btn {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    .histogram {
      width: 500px;
      height: 500px;
    }
  }
}
</style>
