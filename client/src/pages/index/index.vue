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
          <view class="pageHeaderBg"></view>
          
          <view class="topNavCon">
            <TopNav ref="refTapNav" isCustom>
              <template #nav> 
                <view class="navHeader">
                  <text>首页</text>
                </view>
              </template>
            </TopNav>
            <view class="pageCon" :style="{ height: `calc(100% - ${tapNavHeight}px)` }">
              <view class="scrollBox">
                <!--  -->
                <scroll-view
                  class="scrollView"
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
                  <view class="voteListCon">
                    <view class="voteItem" v-for="(item,index) in voteList" :key="index">
                      <view class="voteHeader f-row-s-c">
                        <nut-icon size="32rpx" custom-color="#666" mr-16rpx name="scan"/>
                        <text>投票</text>
                      </view>
                      <h3>{{item.title}}</h3>
                      <view class="voteUnitBox">
                        <view class="unitItem f-row-b-c" 
                          v-for="(unit,uIndex) in item.options"
                          :class="[item.votedId.indexOf(unit.id)!=-1?'active':'']" 
                          :key="uIndex">
                          <view class="unitTxt f-row-s-c">
                            <h5 class="textEllipsis">{{unit.name}}</h5>
                            <nut-icon name="rect-down" size="32rpx"></nut-icon>
                          </view>
                          <p class="unitNum textEllipsis">{{unit.num}}人</p>
                          <view class="unitItemVal" :style="{width: unit.radio+'%'}"></view>
                        </view>
                      </view>
                      <view class="voteFooter f-row-b-c">
                        <view class="footerLeft f-row-s-c">
                          <nut-icon name="rect-down" size="24rpx" custom-color="#777"></nut-icon>
                          <p>{{item.total}}人参与</p>
                        </view>
                        <text>还有8天结束</text>
                      </view>
                    </view>
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
  // 投票列表数据
  const voteList = ref([
    {
      type: 0,
      title: "最受欢迎的电影评选",
      options:[
        {
          name: "《哪吒2》",
          num: 24021,
          id: 0,
          radio: 60,
        },
        {
          name: "《蜡笔小新：好别致的影分身》",
          num: 3195,
          id: 1,
          radio: 21,
        },
        {
          name: "《熊出没·重启未来》",
          num: 2949,
          id: 2,
          radio: 19,
        }
      ],
      total: 30165,
      time: "",
      votedId: [0]
    },
    {
      type: 0,
      title: "校园最受欢迎社团评选",
      options:[
        {
          name: "计算机编程社",
          num: 24021,
          id: 0,
          radio: 60,
        },
        {
          name: "二次元社",
          num: 3195,
          id: 1,
          radio: 21,
        },
        {
          name: "国风社",
          num: 2949,
          id: 2,
          radio: 19,
        }
      ],
      total: 30165,
      time: "",
      votedId: [1,2]
    },
    {
      type: 0,
      title: "最受欢迎的运动项目投票",
      options:[
        {
          name: "乒乓球",
          num: 24021,
          id: 0,
          radio: 60,
        },
        {
          name: "篮球",
          num: 3195,
          id: 1,
          radio: 21,
        },
        {
          name: "游泳",
          num: 2949,
          id: 2,
          radio: 19,
        }
      ],
      total: 30165,
      time: "",
      votedId: [1]
    },
  ])

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
      background-color: #F4F6F9;
      .indexBgCon {
        width: 100%;
        height: 100%;
        background: #f4f6f9;
        .pageHeaderBg {
          width: 100%;
          height: 550rpx;
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
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
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
          .scrollBox{
            width: 100%;
            height: 100%;
            .scrollView{
              width: 100%;
              height: 100%;
              z-index: 1;
            }
          }
          .voteListCon{
            width: 100%;
            padding: 40rpx;
            box-sizing: border-box;
            .voteItem{
              width: 100%;
              background: #fff;
              border-radius: 18rpx;
              padding: 30rpx;
              box-sizing: border-box;
              margin-bottom: 40rpx;
              box-shadow: rgba(99, 99, 99, 0.2) 0rpx 4rpx 16rpx 0rpx;
              .voteHeader{
                width: 100%;
                height: 60rpx;
                margin-bottom: 20rpx;
                text{
                  font-size: 28rpx;
                  font-weight: bold;
                  color: #666;
                }
              }
              h3{
                font-size: 32rpx;
                color: #333;
                font-weight: 500;
                margin-bottom: 20rpx;
              }
              .voteUnitBox{
                width: 100%;
                height: auto;
                margin-bottom: 48rpx;
                .unitItem{
                  width: 100%;
                  margin-bottom: 20rpx;
                  border: 2rpx solid #f0f0f0;
                  border-radius: 12rpx;
                  padding: 20rpx 24rpx;
                  box-sizing: border-box;
                  position: relative;
                  .unitTxt{
                    width: calc(100% - 160rpx);
                    height: auto;
                    z-index: 2;
                    // background: pink;
                    h5{
                      max-width: calc(100% - 52rpx);
                      font-size: 26rpx;
                      font-weight: 500;
                      color: #333;
                    }
                    .nut-icon{
                      margin-left: 20rpx;
                    }
                  }
                  .unitNum{
                    width: 160rpx;
                    height: 100%;
                    text-align: right;
                    font-size: 26rpx;
                    
                    color: #333;
                    z-index: 2;
                  }
                  .unitItemVal{
                    position: absolute;
                    z-index: 1;
                    top: 0rpx;
                    left: 0rpx;
                    width: 40%;
                    height: 100%;
                    border-radius: 8rpx;
                    background: #eeeeee;
                  }
                }
                .unitItem.active{
                  // background: #fbeded;
                  border-color: #c2deff;
                  .unitItemVal{
                    background: #c2deff;
                  }
                  .unitTxt{
                    h5{
                      color: #0073ff;
                    }
                    .nut-icon{
                      color: #0073ff;
                    }
                  }
                  .unitNum{
                    color: #0073ff;
                  }
                }
              }
              .voteFooter{
                .footerLeft{
                  p{
                    margin-left: 12rpx;
                    font-size: 24rpx;
                    color: #777;
                  }
                }
                text{
                  font-size: 24rpx;
                  color: #777;
                }
              }
            }
          }
          
        }
      }
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
