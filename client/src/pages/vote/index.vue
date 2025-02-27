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
          <view class="pageHeaderBg" :style="{paddingTop: `${tapNavHeight}px`}">
            <view class="userInfo"></view>
          </view>

          <view class="topNavCon">
            <TopNav ref="refTapNav" isCustom>
              <template #nav> 
                <view class="navHeader">
                  <view class="back f-row-s-c" @tap="goBack">
                    <nut-icon name="rect-left" custom-color="#fff"></nut-icon>
                    <text>返回</text>
                  </view>
                  <text>发起投票</text>
                  <view class="back"></view>
                </view>
              </template>
            </TopNav>
            <view w-[100%] class="pageCon" :style="{ height: `calc(100% - ${tapNavHeight}px)` }">
              <view class="pageBoxCon">

                <view class="img-a">
                
                </view>
                <view class="login-view" style="">
                  <view class="t-login">
                    <form class="cl">
                      <view class="t-a">
                        <text class="txt">投票名称</text>
                        <input type="text" placeholder="请输入" v-model="voteName" />
                      </view>
                      <view class="t-a">
                        <text class="txt">投票时间</text>
                        <input type="text" placeholder="请选择" v-model="voteTime" />
                      </view>
                      <view class="t-a">
                        <text class="txt">投票人员</text>
                        <input type="text" placeholder="请选择" v-model="voteNum" />
                      </view>
                      <view class="t-a">
                        <text class="txt">投票类型</text>
                        <input type="text" placeholder="请选择" v-model="voteType" />
                      </view>
                      <view class="t-a">
                        <text class="txt">是否匿名</text>
                        <input type="text" placeholder="请选择" v-model="voteNm" />
                      </view>
                      
                    </form>
                  </view>
                </view>
              </view>
              <view class="bottomBtn f-row-c-c">
                <button @tap="sendVote">发 起 投 票</button>
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

  let voteName = ref('您是否选择使用投票系统呢？')
  let voteTime = ref('')
  let voteNum = ref('全体成员')
  let voteType = ref('支持/反对')
  let voteNm = ref('是')

  //注册按钮点击
  const sendVote = () => {
    uni.showToast({ title: '成功发送投票', icon: 'none' });
    uni.switchTab({ 
      url: '/pages/index/index' 
    })
  }

  const goBack = () => {
    uni.navigateBack({ delta: 1 })
  }

  const formatDate = (date)=> {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  voteTime.value = formatDate(new Date())

  onMounted(async () => {
    await refTapNav.value.getNavHeight((res) => {
      if (res.length >= 0) {
        tapNavHeight.value = res[0].height
      }
    })
  })
  onShow(() => {
    console.log('onshow',new Date())
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
          height: 450rpx;
          background-image: url(../../static/images/login/head.png);
          background-size: 100%;
          background-repeat: no-repeat;
          position: absolute;
          top: 0;
          left: 0;
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
            color: #fff;
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
                color: #fff;
              }
            }
          }
        }
        
        .pageCon {
          width: 100%;
          .pageBoxCon{
            width: 100%;
            height: calc(100% - 120rpx);
            overflow-y: auto;
          }
          .bottomBtn{
            width: 100%;
            height: 120rpx;

          }
        }
      }
    }
  }
}

.txt {
	font-size: 32rpx;
	font-weight: bold;
	color: #333333;
}
.img-a {
	width: 100%;
	height: 200rpx;
}
.reg {
	font-size: 28rpx;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	font-weight: bold;
	background: #f5f6fa;
	color: #000000;
	text-align: center;
	margin-top: 30rpx;
}

.login-view {
	width: 100%;
	position: relative;
	margin-top: -120rpx;
	background-color: #ffffff;
	border-radius: 8% 8% 0% 0;
}

.t-login {
	width: 600rpx;
	margin: 0 auto;
	font-size: 28rpx;
	padding-top: 80rpx;
}

button {
	font-size: 28rpx;
	background: #2796f2;
	color: #fff;
	height: 90rpx;
  width: 80%;
	line-height: 90rpx;
	border-radius: 50rpx;
	font-weight: bold;
}

.t-login input {
	height: 90rpx;
	line-height: 90rpx;
	margin-bottom: 50rpx;
	border-bottom: 1px solid #e9e9e9;
	font-size: 28rpx;
}

.t-login .t-a {
	position: relative;
}

.t-b {
	text-align: left;
	font-size: 42rpx;
	color: #ffffff;
	padding: 130rpx 0 0 70rpx;
	font-weight: bold;
	line-height: 70rpx;
}

.t-login .t-c {
	position: absolute;
	right: 22rpx;
	top: 22rpx;
	background: #5677fc;
	color: #fff;
	font-size: 24rpx;
	border-radius: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 25rpx;
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 80rpx 0;
}

.t-login .t-e {
	text-align: center;
	width: 250rpx;
	margin: 80rpx auto 0;
}

.t-login .t-g {
	float: left;
	width: 50%;
}

.t-login .t-e image {
	width: 50rpx;
	height: 50rpx;
}

.t-login .t-f {
	text-align: center;
	margin: 150rpx 0 0 0;
	color: #666;
}

.t-login .t-f text {
	margin-left: 20rpx;
	color: #aaaaaa;
	font-size: 27rpx;
}

.t-login .uni-input-placeholder {
	color: #aeaeae;
}

.cl {
	zoom: 1;
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20';
}
</style>
