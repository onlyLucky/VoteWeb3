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
            <TopNav ref="refTapNav" :isCustom="false">
              <template #nav> 
                <view class="navHeader">
                  <text>登录</text>
                </view>
              </template>
            </TopNav>
            <view w-[100%] class="pageCon" :style="{ height: `calc(100% - ${tapNavHeight}px)` }">
              <view class="img-a">
                <view class="t-b">
                  您好，
                  <br />
                  欢迎使用投票应用
                </view>
              </view>
              <view class="login-view" style="">
                <view class="t-login">
                  <form class="cl">
                    <view class="t-a">
                      <text class="txt">账号</text>
                      <input type="text" placeholder="请输入您的账号" v-model="phone" />
                    </view>
                    <view class="t-a">
                      <text class="txt">密码</text>
                      <input type="password" name="code" maxlength="18" placeholder="请输入您的密码" v-model="pwd" />
                    </view>
                    <button @tap="login()">登 录</button>
                    <view class="reg" @tap="reg()">注 册</view>
                  </form>
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

  let phone = ref('admin')
  let pwd = ref('123456')

  const login = ()=> {
    if (!phone.value) {
      uni.showToast({ title: '请输入您的账号', icon: 'none' });
      return;
    }
    if (!pwd.value) {
      uni.showToast({ title: '请输入您的密码', icon: 'none' });
      return;
    }
    uni.showToast({ title: '登录成功！', icon: 'none' });
    uni.switchTab({
      url: "/pages/index/index"
    })
  }
  //注册按钮点击
  const reg = () => {
    uni.showToast({ title: '注册跳转', icon: 'none' });
    uni.navigateTo({
      url: "/pages/login/registered"
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
	height: 450rpx;
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

.t-login button {
	font-size: 28rpx;
	background: #2796f2;
	color: #fff;
	height: 90rpx;
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
