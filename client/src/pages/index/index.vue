<template>
  <view
    w-[100%]
    h-[100%]
    overflow-hidden
    box-border
    relative
    :style="{ paddingBottom: `${blackLineH}px` }"
  >
    <view w-[100%] h-[100%]>
      <view
        w-[100%]
        bg-[#F4F6F9]
        class="indexPageCon"
        :style="{ height: `calc(100% - ${getTabBarHeight}rpx)` }"
      >
        <view w-[100%] h-[100%] class="indexBgCon">
          <view absolute top-0 left-0 class="pageHeaderBg"></view>

          <view w-[100%] h-[100%] z-1 relative>
            <TopNav ref="refTapNav" isCustom>
              <template #nav> 
                <view 
                  w-[100%] h-90rpx bg-#fff flex items-center justify-center
                  border-b-2rpx border-b-solid border-b-[#eee]
                  class="navHeader"
                >
                  <text text-34rpx >首页</text>
                </view>
              </template>
            </TopNav>
            <view w-[100%] class="pageCon" :style="{ height: `calc(100% - ${tapNavHeight}px)` }">
              <view  w-[100%] h-[100%] >
                <!--  -->
                <scroll-view
                  w-[100%] h-[100%] z-1 
                  scroll-y="true"
                  :refresher-enabled="true"
                  :refresher-triggered="triggered"
                  :refresher-threshold="50"
                  refresher-default-style="none"
                  refresher-background="#edf2f9"
                  @refresherpulling="onPulling"
                  @refresherrefresh="onRefresh"
                  @refresherrestore="onRestore"
                  @refresherabort="onAbort"
                >
                  <template #refresher>
                    <view w-[100%] h-[100%] flex items-center justify-center>
                      <!-- 下拉触发 -->
                      <view v-show="!triggered && !isCanRefresh" flex items-center justify-center >
                        <nut-icon size="32rpx" custom-color="#919cab" mr-10rpx font-class-name="iconfont" class-prefix="icon" name="xialashuaxin"/>
                        <text text-28rpx text-#919cab >下拉触发</text>
                      </view>
                      <!-- 释放刷新 -->
                      <view v-show="!triggered && isCanRefresh" flex items-center justify-center >
                        <nut-icon size="32rpx" class="transform rotate-180 origin-center" custom-color="#919cab" mr-10rpx font-class-name="iconfont" class-prefix="icon" name="xialashuaxin"/>
                        <text text-28rpx text-#919cab >释放刷新</text>
                      </view>
                      <!-- 刷新中 -->
                      <view v-show="triggered && isCanRefresh" flex items-center justify-center >
                        <nut-icon size="32rpx" custom-color="#919cab" mr-10rpx  name="loading1" class="nut-icon-am-rotate nut-icon-am-infinite"></nut-icon>
                        <text text-28rpx text-#919cab >刷新中</text>
                      </view>
                    </view>
                  </template>
                  
                  <!-- 数据列表 -->
                  <view >
                    <view>
                      <nut-icon size="32rpx" custom-color="#565661" mr-10rpx name="scan"/>
                      <text text-28rpx text-#565661 >投票</text>
                    </view>
                    <h3>10元风暴即将落幕，下次活动你期待有哪些变化？</h3>
                  </view>
                </scroll-view>
                <!-- 回到顶部 -->
              </view>
            </view>
          </view>
        </view>
      </view>
      <TabBar z-10 relative></TabBar>
    </view>
  </view>
</template>
<script setup>
  const wsState = inject('wsNum')
  import { useConfigStore } from '@/store/config'
  const { getTabBarHeight, blackLineH } = useConfigStore()

  const refTapNav = ref(null)
  let tapNavHeight = ref(0)

  const list = ref([]); // 数据列表

  let triggered = ref(false); // 是否触发下拉刷新
  let isCanRefresh = ref(false); // 是否可以下拉刷新
  // 模拟加载数据
  const loadData = () => {
    list.value = new Array(10).fill(null).map((_, index) => `Item ${index + 1}`);
  };
  // 下拉刷新逻辑
  const onRefresh = () => {
    if (triggered.value) return; // 防止重复触发
    triggered.value = true;
    if(isCanRefresh.value){
      setTimeout(() => {
        loadData()
        triggered.value = false; // 关闭下拉刷新
        isCanRefresh.value = false;
      }, 1000);
    }else{
      triggered.value = false;
    }
  };
  const onPulling = (e)=> {
    // e.detail.deltaY
    isCanRefresh.value = e.detail.deltaY>=100;
  }

  const onRestore = ()=> {
    triggered.value = false;
    console.log("onRestore");
  }
  const onAbort = () => {
    console.log("onAbort");
  }

  // 初始化加载数据
  loadData();

  onMounted(async () => {
    await refTapNav.value.getNavHeight((res) => {
      if (res.length >= 0) {
        tapNavHeight.value = res[0].height
        console.log(tapNavHeight.value)
      }
    })
  })
  onShow(() => {
    console.log('onshow')
    console.log('wsState', wsState.value)
  })
</script>

<style scoped lang="scss">
  .indexPageCon {
    .indexBgCon {
      background: #f4f6f9;
      .pageHeaderBg {
        width: 100%;
        height: 550rpx;
        // background: #fff;
      }
      .navHeader{
        box-shadow: 4rpx 8rpx 10rpx -1rpx rgba(230, 232, 235,0.3);
      }
      .pageCon {
      }
    }
  }
  .custom-refresher {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    color: #333;
  }
</style>
