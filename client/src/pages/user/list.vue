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
                  <text>人员列表</text>
                  <view class="back"></view>
                </view>
              </template>
            </TopNav>
            <view w-[100%] class="pageCon" :style="{ height: `calc(100% - ${tapNavHeight}px)` }">
              <view class="userPage">
                <view class="userItem f-row-s-c" v-for="(item, index) in userList" :key="index">
                  <view class="avatar">
                    <image
                      src="@/static/images/user/avatar.png"
                      mode="aspectFit"
                      lazy-load
                    />
                  </view>
                  <view class="userInfo">
                    <h3>{{item.username}}</h3>
                    <text>{{item.dept}}</text>
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

  let userList = ref([
  {
      "username": "张伟",
      "dept": "计算机科学与技术"
    },
    {
      "username": "李娜",
      "dept": "计算机科学与技术"
    },
    {
      "username": "王强",
      "dept": "计算机科学与技术"
    },
    {
      "username": "赵敏",
      "dept": "计算机科学与技术"
    },
    {
      "username": "刘洋",
      "dept": "计算机科学与技术"
    },
    {
      "username": "陈静",
      "dept": "计算机科学与技术"
    },
    {
      "username": "孙浩",
      "dept": "计算机科学与技术"
    },
    {
      "username": "周莉",
      "dept": "计算机科学与技术"
    },
    {
      "username": "吴迪",
      "dept": "计算机科学与技术"
    },
    {
      "username": "郭磊",
      "dept": "计算机科学与技术"
    }
  ])

  const goBack = () => {
    uni.navigateBack({ delta: 1 })
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
          .userPage{
            width: 100%;
            height: auto;
            padding: 0 40rpx;
            box-sizing: border-box;
            .userItem{
              width: 100%;
              height: 180rpx;
              .avatar{
                width: 130rpx;
                height: 130rpx;
                margin-right: 30rpx;
                image{
                  width: 100%;
                  height: 100%;
                }
              }
              .userInfo{
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
