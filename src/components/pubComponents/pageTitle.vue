<template>
  <div class="box">
    <div class="left">
      <div class="icon"></div>
      <div class="title">{{ title }}</div>
    </div>
    <div class="right">
      <slot name="btn"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup="prop">
import { defineProps } from "vue"
defineProps({
  title: String
})
</script>

<style scope lang="scss">
.box {
  width: 100%;
  height: 50px;
  background: #dbe4fd;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;

    .icon {
      width: 20px;
      height: 50px;
      background-color: #4d79f6;
      margin-right: 10px;
    }
  }

  .right {
    margin-right: 15px;
  }
}
</style>
