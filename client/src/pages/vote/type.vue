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
                  <view class="back f-row-s-c" @tap="goBack">
                    <nut-icon name="rect-left"></nut-icon>
                    <text>返回</text>
                  </view>
                  <text>发起投票</text>
                  <view class="back"></view>
                </view>
              </template>
            </TopNav>
            <view w-[100%] class="pageCon" :style="{ height: `calc(100% - ${tapNavHeight}px)` }">
              <view class="votePage">
                <view class="voteItem f-row-b-c" 
                  v-for="(item, index) in voteType"
                  @tap="goCreate" 
                  :key="index">
                  <view class="typeInfo">
                    <h3>{{item.title}}</h3>
                    <text>{{item.desc}}</text>
                  </view>
                  <nut-icon name="rect-right" custom-color="#999"></nut-icon>
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

  let voteType = ref([
    {
      title:"默认投票",
      desc: "是与否的选择"
    },
    {
      title:"图文投票",
      desc: "快速创建图文的投票"
    },
    {
      title:"群投票",
      desc: "指定组织内部成员投票"
    },
    {
      title:"多项投票",
      desc: "可以选择多项"
    }
  ])

  const goBack = () => {
    uni.navigateBack({ delta: 1 })
  }

  const goCreate = () => {
    uni.navigateTo({
      url: '/pages/vote/index'
    })
  }

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
            justify-content: space-between;
            background: #fff;
            border-bottom: 2rpx solid #eee;
            box-shadow: 4rpx 8rpx 10rpx -1rpx rgba(230, 232, 235,0.3);
            padding: 0 20rpx;
            box-sizing: border-box;
            text{
              font-size: 34rpx;
              font-weight: 600;
            }
            .back{
              width: 140rpx;
              text{
                font-size: 32rpx;
                color: #333;
              }
            }
          }
        }
        
        .pageCon {
          width: 100%;
          overflow-y: auto;
          .votePage{
            width: 100%;
            height: auto;
            padding: 40rpx 40rpx;
            box-sizing: border-box;
            .voteItem{
              width: 100%;
              height: 180rpx;
              background: #fff;
              border-radius: 20rpx;
              margin-bottom: 40rpx;
              padding: 0 40rpx;
              box-sizing: border-box;
              .typeInfo{
                h3{
                  font-size: 32rpx;
                  color: #333;
                  font-weight: bold;
                  margin-bottom: 10rpx;
                }
                text{
                  font-size: 26rpx;
                  color: #999;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
