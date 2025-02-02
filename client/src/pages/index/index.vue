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
                <view w-[100%] h-90rpx bg-#fff flex>1111</view>
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
      .pageCon {
      }
    }
  }
</style>
