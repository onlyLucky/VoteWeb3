<script lang="ts" setup>
import type { RouteRecordRaw } from "vue-router"
import { isExternal } from "@@/utils/validate"
import path from "path-browserify"
import Link from "./Link.vue"

interface Props {
  item: RouteRecordRaw
  basePath?: string
  active: string
}

const props = withDefaults(defineProps<Props>(), {
  basePath: "",
  active: ""
})

/** 是否始终显示根菜单 */
const alwaysShowRootMenu = computed(() => props.item.meta?.alwaysShow)

/** 显示的子菜单 */
const showingChildren = computed(() => props.item.children?.filter(child => !child.meta?.hidden) ?? [])

/** 显示的子菜单数量 */
const showingChildNumber = computed(() => showingChildren.value.length)

/** 唯一的子菜单项 */
const theOnlyOneChild = computed(() => {
  const number = showingChildNumber.value
  switch (true) {
    case number > 1:
      return null
    case number === 1:
      return showingChildren.value[0]
    default:
      return { ...props.item, path: "" }
  }
})

/** 解析路径 */
function resolvePath(routePath: string) {
  switch (true) {
    case isExternal(routePath):
      return routePath
    case isExternal(props.basePath):
      return props.basePath
    default:
      return path.resolve(props.basePath, routePath)
  }
}

/** 获取图标名称 */
function getSvgIconName(isActive: boolean, svgIcon?: string): string {
  if (!svgIcon) return ""
  return isActive ? `${svgIcon}_active` : svgIcon
}
</script>

<template>
  <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
    <Link v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
      <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
        <SvgIcon
          v-if="theOnlyOneChild.meta.svgIcon"
          :name="theOnlyOneChild.meta.svgIcon"
          class="svg-icon"
        />
        <component v-else-if="theOnlyOneChild.meta.elIcon" :is="theOnlyOneChild.meta.elIcon" class="el-icon" />
        <template v-if="theOnlyOneChild.meta.title" #title>
          <!-- {{  }} -->
          <span class="title">{{ theOnlyOneChild.meta.title }}</span>
        </template>
      </el-menu-item>
    </Link>
  </template>
  <el-sub-menu v-else :index="resolvePath(props.item.path)" teleported>
    <template #title>
      <SvgIcon v-if="props.item.meta?.svgIcon" :name="props.item.meta.svgIcon" class="svg-icon" />
      <component v-else-if="props.item.meta?.elIcon" :is="props.item.meta.elIcon" class="el-icon" />
      <span v-if="props.item.meta?.title" class="title">{{ props.item.meta.title }}</span>
    </template>
    <template v-if="props.item.children">
      <Item
        v-for="child in showingChildren"
        :key="child.path"
        :item="child"
        :active="props.active"
        :base-path="resolvePath(child.path)"
      />
    </template>
  </el-sub-menu>
</template>

<style lang="scss" scoped>
@import "@@/assets/styles/mixins.scss";

.svg-icon {
  width: 24px !important;
  height: 24px !important;
  margin-right: 12px;
  font-size: 20px;
  color: #333;
}

.el-icon {
  width: 24px !important;
  height: 24px !important;
  margin-right: 12px !important;
  font-size: 18px;
  color: #333;
}

.title {
  @extend %ellipsis;
}
</style>
