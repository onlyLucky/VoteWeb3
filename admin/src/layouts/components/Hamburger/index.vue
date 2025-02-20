<script lang="ts" setup>
import { useDevice } from "@@/composables/useDevice"
import { Expand, Fold } from "@element-plus/icons-vue"

const props = withDefaults(defineProps<Props>(), {
  isActive: false
})

const emit = defineEmits<{
  toggleClick: []
}>()

const { isMobile } = useDevice()

interface Props {
  isActive?: boolean
}

function toggleClick() {
  emit("toggleClick")
}
</script>

<template>
  <div @click="toggleClick" v-show="isMobile">
    <el-icon :size="20" class="icon">
      <Fold v-if="props.isActive" />
      <Expand v-else />
    </el-icon>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
  color: var(--v3-hamburger-text-color);
}
</style>
