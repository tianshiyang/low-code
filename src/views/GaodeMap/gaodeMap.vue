<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity'
import { onMounted } from 'vue';

interface Marker {
  position: Array<number>
  title: string
}

let map: any = shallowRef(<unknown>null)

// 地图初始化函数
const initMap: () => void = (): void => {
  AMapLoader.load({
    key: "f38ad02edd77107989161aff9f3c40a2",
    version: "2.0"
  }).then((AMap) => {
    map = new AMap.Map("map", {
      viewModel: "2D",
      zoom: 11,
      center: [116.397428, 39.90923]
    })

    let marker_list: Array<Marker> = [
      {
        position: [116.614025, 40.074912],
        title: "北京首都国际机场"
      }, {
        position: [116.341427, 39.957905],
        title: "中央财经大学"
      }, {
        position: [116.30658, 39.917366],
        title: "中央电视塔"
      }
    ]
    map.add(createMultipleMarker(AMap, marker_list))
  }).catch((e: any) => {
    console.log(e)
  })
}

// 创建多个marker标记
const createMultipleMarker: (AMap: any, options_list: Array<Marker>) => any = (AMap: any, options_list: Array<Marker>): any => {
  return options_list.map((res: Marker) => {
    return new AMap.Marker({
      position: new AMap.LngLat(res.position[0], res.position[1]),
      title: res.title
    })
  })
}

onMounted(() => {
  initMap()
})

</script>
<style lang="scss" scoped>
#map {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 800px;
}
</style>
