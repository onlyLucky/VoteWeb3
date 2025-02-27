<template>
  <view
    class="Page"
    :style="{ paddingBottom: `${blackLineH}px` }"
  >
    <view class="pageBox">
      <view
        class="indexPageCon"
        :style="{ height: `100%` }"
      >
        <view class="indexBgCon">
          <view class="pageHeaderBg" :style="{paddingTop: `${tapNavHeight}px`}"></view>

          <view class="topNavCon">
            <TopNav ref="refTapNav" isCustom>
              <template #nav> 
                <view class="navHeader">
                  <text>人员列表</text>
                </view>
              </template>
            </TopNav>
            <view w-[100%] class="pageCon" :style="{ height: `calc(100% - ${tapNavHeight}px)` }">
              <view class="userPage">
                <view class="userItem">
                  <view class="avatar">
                    <image
                      src="@/static/images/user/avatar.png"
                      mode="aspectFit"
                      lazy-load
                    />
                  </view>
                  <view class="userInfo">
                    <h3>用户名</h3>
                    <text>计算机科学与技术</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
  const wsState = inject('wsNum')
  import { useConfigStore } from '@/store/config'
  const { blackLineH } = useConfigStore()

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
      background-color: #fff;
      .indexBgCon {
        width: 100%;
        height: 100%;
        background: #fff;
        .pageHeaderBg {
          width: 100%;
          height: 240rpx;
          position: absolute;
          top: 0;
          left: 0;
          // background: linear-gradient(180deg, #c3e5fe,#daf1fc,#e8f8ff,#fefffe, #fdfcfd);
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
            background: #fff;
            border-bottom: 2rpx solid #eee;
            box-shadow: 4rpx 8rpx 10rpx -1rpx rgba(230, 232, 235,0.3);
            text{
              font-size: 34rpx;
              font-weight: 600;
            }
          }
        }
        
        .pageCon {
          width: 100%;
          overflow-y: auto;
          .userPage{
            
          }
        }
      }
    }
  }
}
</style>
