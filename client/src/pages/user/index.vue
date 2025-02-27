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
          <view class="pageHeaderBg" :style="{paddingTop: `${tapNavHeight}px`}"></view>

          <view class="topNavCon">
            <TopNav ref="refTapNav" isCustom>
              <template #nav> 
                <view class="navHeader">
                  <text>我的</text>
                </view>
              </template>
            </TopNav>
            <view w-[100%] class="pageCon" :style="{ height: `calc(100% - ${tapNavHeight}px)` }">
              <view class="userInfo f-row-b-c">
                <div class="userInfoLeft f-row-s-c">
                  <view class="avatar f-row-c-c">
                    <image
                      src="@/static/images/user/avatar.png"
                      mode="aspectFit"
                      lazy-load
                    />
                  </view>
                  <view class="infoCon">
                    <h3>管理员</h3>
                    <text>CODE: admin</text>
                  </view>
                </div>
                <view class="userInfoRight f-row-c-c">
                  <nut-icon name="category" custom-color="#2085FF" size="32rpx"></nut-icon>
                  <text>钱包账户</text>
                </view>
              </view>
              <view class="conPadding">
                <view class="voteData f-row-b-c">
                  <view class="voteItem f-col-c-c">
                    <h3>3</h3>
                    <text>发起投票</text>
                  </view>
                  <view class="voteItem f-col-c-c">
                    <h3>6</h3>
                    <text>查看投票</text>
                  </view>
                  <view class="voteItem f-col-c-c">
                    <h3>10</h3>
                    <text>参与投票</text>
                  </view>
                </view>

                <view class="optionBox">
                  <view class="optionItem f-row-b-c" @tap="goUserList">
                    <view class="optLeft f-row-s-c">
                      <nut-icon name="my" size="32rpx"></nut-icon>
                      <text class="leftTxt">人员列表</text>
                    </view>
                    <nut-icon name="rect-right" custom-color="#999"></nut-icon>
                  </view>
                  <view class="optionItem f-row-b-c">
                    <view class="optLeft f-row-s-c">
                      <nut-icon name="notice" size="32rpx"></nut-icon>
                      <text class="leftTxt">消息通知</text>
                    </view>
                    <nut-icon name="rect-right" custom-color="#999"></nut-icon>
                  </view>
                  <view class="optionItem f-row-b-c">
                    <view class="optLeft f-row-s-c">
                      <nut-icon name="ask2" size="32rpx"></nut-icon>
                      <text class="leftTxt">常见问题</text>
                    </view>
                    <nut-icon name="rect-right" custom-color="#999"></nut-icon>
                  </view>
                </view>
              </view>
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

  const goUserList = ()=>{
    uni.navigateTo({
      url: "/pages/user/list"
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
          background-image: url(../../static/images/login/head.png);
          background-size: 100%;
          background-repeat: no-repeat;
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
            color: #fff;
            text{
              font-size: 34rpx;
              font-weight: 600;
            }
          }
        }
        
        .pageCon {
          width: 100%;
          .userInfo{
            width: 100%;
            height: 240rpx;
            padding: 0 50rpx;
            box-sizing: border-box;
            .userInfoLeft{
              .avatar{
                width: 130rpx;
                height: 130rpx;
                margin-right: 20rpx;
                image{
                  width: 100%;
                  height: 100%;
                }
              }
              .infoCon{
                h3{
                  font-size: 32rpx;
                  color: #fff;
                  font-weight: bold;
                  margin-bottom: 6rpx;
                }
                text{
                  font-size: 26rpx;
                  color: rgba(255,255,255,0.7);
                }
              }
            }
            .userInfoRight{
              padding: 20rpx;
              border-radius: 50rpx;
              background-color: #f1f7fb;
              text{
                font-size: 26rpx;
                color: #2085FF;
                margin-left: 6rpx;
              }
            }
          }
          .conPadding{
            width: 100%;
            height: auto;
            padding: 0 20rpx;
            margin-top: 20rpx;
            box-sizing: border-box;
            .voteData{
              width: 100%;
              height: 200rpx;
              background: #fff;
              border-radius: 20rpx;
              padding: 0 80rpx;
              box-sizing: border-box;
              margin-bottom: 20rpx;
              .voteItem{
                h3{
                  font-size: 46rpx;
                  color: #333;
                  margin-bottom: 10rpx;
                }
                text{
                  font-size: 24rpx;
                  color: #999;
                }
              }
            }
            .optionBox{
              width: 100%;
              height: auto;
              background: #fff;
              border-radius: 20rpx;
              overflow: hidden;
              padding: 0 30rpx;
              box-sizing: border-box;

              .optionItem{
                width: 100%;
                height: 120rpx;
                border-bottom: 2rpx solid #f3f5f9;
                .optLeft{
                  .leftTxt{
                    margin-left: 20rpx;
                    font-size: 32rpx;
                  }
                }
              }
              .optionItem:last-child{
                border: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
