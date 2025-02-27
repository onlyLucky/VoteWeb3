<script lang="ts" setup>
import { useDevice } from "@@/composables/useDevice"
import Statistics from "./components/Statistics.vue"

const { isMobile } = useDevice()
</script>

<template>
  <div class="app-container" :class="{ mobile: isMobile }">
    <div class="container f-col-c-c">
      <!-- <Statistics /> -->
      <img src="./images/dashboard.svg" alt="">
      <p>欢迎使用</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@@/assets/styles/mixins.scss";
.app-container {
  width: 100%;
  height: 100%;
  padding: 0px 10px 20px 0px;
  box-sizing: border-box;
  .container {
    width: 100%;
    height: 100%;
    padding-right: 10px;
    box-sizing: border-box;
    overflow-y: auto;
    @extend %scrollbar;
    .dataBox {
      width: 100%;
      height: 200px;
    }
    img {
      width: 60%;
      height: auto;
    }
    p {
      font-size: 14px;
      color: #999;
      margin-top: 10px;
    }
  }
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .svg {
    width: 600px;
    max-width: 100%;
  }
}
</style>
