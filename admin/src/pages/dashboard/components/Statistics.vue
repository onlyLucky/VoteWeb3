<script lang="ts" setup>
const dataList = ref<any[]>([
  {
    title: "场景数量",
    num: 20
  },
  {
    title: "视频会议资源",
    num: 20
  },
  {
    title: "RTSP流数量",
    num: 168
  },
  {
    title: "矩阵口数量",
    num: 168
  }
])
</script>

<template>
  <div class="dataBox statistics">
    <div class="header">
      <div class="headerLeft">
        <h3>数据统计</h3>
        <p>最近统计时间 2025-02-15</p>
      </div>
    </div>
    <div class="conBox">
      <div class="conBoxItem">
        <div class="itemLeft">
          <h3>场景数量</h3>
          <p>20</p>
        </div>
        <img src="../images/statistics00.png" alt="">
      </div>
      <div class="conBoxItem">
        <div class="itemLeft">
          <h3>场景数量</h3>
          <p>20</p>
        </div>
        <img src="../images/statistics00.png" alt="">
      </div>
      <div class="conBoxItem">
        <div class="itemLeft">
          <h3>场景数量</h3>
          <p>20</p>
        </div>
        <img src="../images/statistics00.png" alt="">
      </div>
      <div class="conBoxItem">
        <div class="itemLeft">
          <h3>场景数量</h3>
          <p>20</p>
        </div>
        <img src="../images/statistics00.png" alt="">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .statistics {
}
</style>
