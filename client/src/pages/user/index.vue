<template>
  <view
    class="Page"
    :style="{ paddingBottom: `${blackLineH}px` }"
  >
    <view class="pageBox">
      <view
        class="indexPageCon"
        :style="{ height: `calc(100% - ${getTabBarHeight}rpx)` }"
      >
        <view class="indexBgCon">
          <view class="pageHeaderBg" :style="{paddingTop: `${tapNavHeight}px`}">
            <view class="userInfo"></view>
          </view>

          <view class="topNavCon">
            <TopNav ref="refTapNav" isCustom>
              <template #nav> 
                <view class="navHeader">
                  <text>首页</text>
                </view>
              </template>
            </TopNav>
            <view w-[100%] class="pageCon" :style="{ height: `calc(100% - ${tapNavHeight}px)` }">
              123
            </view>
          </view>
        </view>
      </view>
      <TabBar></TabBar>
    </view>
  </view>
</template>
<script setup>
  const wsState = inject('wsNum')
  import { useConfigStore } from '@/store/config'
  const { getTabBarHeight, blackLineH } = useConfigStore()

  const refTapNav = ref(null)
  let tapNavHeight = ref(0)

  onMounted(async () => {
    await refTapNav.value.getNavHeight((res) => {
      if (res.length >= 0) {
        tapNavHeight.value = res[0].height
      }
    })
  })
  onShow(() => {
    console.log('onshow')
    console.log('wsState', wsState.value)
  })
</script>

<style scoped lang="scss">
.Page{
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  .pageBox{
    width: 100%;
    height: 100%;
    .indexPageCon {
      width: 100%;
      background-color: #f3f5f9;
      .indexBgCon {
        width: 100%;
        height: 100%;
        background: #f3f5f9;
        .pageHeaderBg {
          width: 100%;
          height: 240rpx;
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(180deg, #c3e5fe, #fcfbfd);
        }
        .topNavCon{
          width: 100%;
          height: 100%;
          z-index: 1;
          position: relative;
          .navHeader{
            width: 100%;
            height: 90rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            text{
              font-size: 34rpx;
              font-weight: 600;
            }
          }
        }
        
        .pageCon {
          width: 100%;
          
        }
      }
    }
  }
}
</style>
