<script lang="ts" setup>
import type { CreateOrUpdateTableRequestData, TableData } from "@@/apis/tables/type"
import type { FormInstance, FormRules } from "element-plus"
import { createTableDataApi, deleteTableDataApi, getTableDataApi, updateTableDataApi } from "@@/apis/tables"
import { useDevice } from "@@/composables/useDevice"
import { usePagination } from "@@/composables/usePagination"
import { CirclePlus, Delete, Download, Refresh, RefreshRight, Search } from "@element-plus/icons-vue"
import { cloneDeep } from "lodash-es"

defineOptions({
  // 命名当前组件
  name: "Vote"
})

let id = 1000
const data = ref([
  {
    id: 1,
    label: "杭州电子科技大学",
    children: [
      {
        id: 4,
        label: "继续教育学院",
        children: [
          {
            id: 9,
            label: "计算机科学与技术01"
          },
          {
            id: 10,
            label: "计算机科学与技术01"
          }
        ]
      }
    ]
  }
])

// 添加
function append(data: { children: { id: number, label: string, children: never[] }[] }) {
  const newChild = { id: id++, label: "testtest", children: [] }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
}

// 删除
function remove(node: { parent: any }, data: { id: any }, store?: any) {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d: { id: any }) => d.id === data.id)
  children.splice(index, 1)
}

// 编辑
function edit(data: { label: string }) {
  ElMessageBox.prompt("请输入标题", "编辑", {
    confirmButtonText: "确定",
    cancelButtonText: "取消"
  }).then(({ value }) => {
    if (value != null) {
      data.label = value
    }
  }).catch(() => { })
}

// 按钮渲染
function renderContent(h: (arg0: string, arg1: { class?: string, style?: { width: string, display: string, justifyContent: string } | { flex: string } | { marginLeft: string, color: string } | { marginLeft: string, color: string } | { marginLeft: string, color: string }, onClick?: (() => void) | (() => void) | (() => void) }, arg2: string | any[]) => any, { node, data, store }: any) {
  return h(
    "div",
    {
      class: "custom-tree-node",
      style: { width: "100%", display: "flex", justifyContent: "space-between" } // 设置父元素的样式
    },
    [
      h(
        "span",
        {
          class: "node-label",
          style: { flex: "1" } // 设置节点名称的样式，使其占据剩余空间
        },
        node.label
      ),
      h(
        "div",
        { class: "action-links" },
        [
          h(
            "a",
            {
              onClick: () => append(data),
              style: { marginLeft: "50px", color: "#3c92fc" } // 设置添加按钮的样式，设置左边距
            },
            " 添加 "
          ),
          h(
            "a",
            {
              onClick: () => edit(data),
              style: { marginLeft: "10px", color: "#3c92fc" } // 设置编辑按钮的样式，设置左边距
            },
            " 编辑 "
          ),
          h(
            "a",
            {
              onClick: () => remove(node, data, store),
              style: { marginLeft: "10px", color: "#fd181d" } // 设置删除按钮的样式，设置左边距
            },
            " 删除 "
          )

        ]
      )
    ]
  )
}

const { isMobile } = useDevice()

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

// #region 增
const DEFAULT_FORM_DATA: CreateOrUpdateTableRequestData = {
  id: undefined,
  username: "",
  password: ""
}
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = ref<CreateOrUpdateTableRequestData>(cloneDeep(DEFAULT_FORM_DATA))
const formRules: FormRules<CreateOrUpdateTableRequestData> = {
  username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
  password: [{ required: true, trigger: "blur", message: "请输入密码" }]
}
function handleCreateOrUpdate() {
  formRef.value?.validate((valid) => {
    if (!valid) {
      ElMessage.error("表单校验不通过")
      return
    }
    loading.value = true
    const api = formData.value.id === undefined ? createTableDataApi : updateTableDataApi
    api(formData.value).then(() => {
      ElMessage.success("操作成功")
      dialogVisible.value = false
      getTableData()
    }).finally(() => {
      loading.value = false
    })
  })
}
function resetForm() {
  formRef.value?.clearValidate()
  formData.value = cloneDeep(DEFAULT_FORM_DATA)
}
// #endregion

// #region 删
function handleDelete(row: TableData) {
  ElMessageBox.confirm(`正在删除用户：${row.username}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteTableDataApi(row.id).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
// #endregion

// #region 改
function handleUpdate(row: TableData) {
  dialogVisible.value = true
  formData.value = cloneDeep(row)
}
// #endregion

// #region 查
const tableData = ref<TableData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  username: "",
  phone: ""
})
function getTableData() {
  loading.value = true
  getTableDataApi({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize,
    username: searchData.username,
    phone: searchData.phone
  }).then(({ data }) => {
    paginationData.total = data.total
    tableData.value = data.list
  }).catch(() => {
    tableData.value = []
  }).finally(() => {
    loading.value = false
  })
}
function handleSearch() {
  paginationData.currentPage === 1 ? getTableData() : (paginationData.currentPage = 1)
}
function resetSearch() {
  searchFormRef.value?.resetFields()
  handleSearch()
}
// #endregion

// 监听分页参数的变化
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container" :class="{ mobile: isMobile }">
    <div class="container">
      <div class="containerCon">
        <!-- <el-alert
          title="数据来源"
          type="success"
          description="由 Apifox 提供在线 Mock，数据不具备真实性，仅供简单的 CRUD 操作演示。"
          show-icon
        /> -->
        <el-card v-loading="loading" shadow="never" class="search-wrapper">
          <el-form ref="searchFormRef" :inline="true" :model="searchData">
            <el-form-item prop="username" label="组织名称">
              <el-input v-model="searchData.username" placeholder="请输入" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :icon="Search" @click="handleSearch">
                查询
              </el-button>
              <el-button :icon="Refresh" @click="resetSearch">
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card v-loading="loading" shadow="never">
          <div class="toolbar-wrapper">
            <div>
              <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">
                邀请用户
              </el-button>
              <el-button type="danger" :icon="Delete">
                批量删除
              </el-button>
            </div>
            <div>
              <el-tooltip content="下载">
                <el-button type="primary" :icon="Download" circle />
              </el-tooltip>
              <el-tooltip content="刷新当前页">
                <el-button type="primary" :icon="RefreshRight" circle @click="getTableData" />
              </el-tooltip>
            </div>
          </div>
          <div class="table-wrapper">
            <el-tree
              :data="data" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false"
              :render-content="renderContent"
            />
          </div>
        </el-card>
        <!-- 新增/修改 -->
        <el-dialog
          v-model="dialogVisible"
          :title="formData.id === undefined ? '新增用户' : '修改用户'"
          width="30%"
          @closed="resetForm"
        >
          <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
            <el-form-item prop="username" label="用户名">
              <el-input v-model="formData.username" placeholder="请输入" />
            </el-form-item>
            <el-form-item v-if="formData.id === undefined" prop="password" label="密码">
              <el-input v-model="formData.password" placeholder="请输入" />
            </el-form-item>
          </el-form>
          <template #footer>
            <el-button @click="dialogVisible = false">
              取消
            </el-button>
            <el-button type="primary" :loading="loading" @click="handleCreateOrUpdate">
              确认
            </el-button>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@@/assets/styles/mixins.scss";
.app-container {
  width: 100%;
  height: 100%;
  padding: 0px 10px 20px 0px;
  box-sizing: border-box;
  .container {
    width: 100%;
    height: 100%;
    padding-right: 10px;
    box-sizing: border-box;
    overflow-y: auto;
    .containerCon {
      width: 100%;
      height: 100%;
      background: #fff;
      border-radius: 6px;
      .header {
        width: 100%;
        height: 60px;
      }
      .footer {
        width: 100%;
        height: 60px;
      }
      .conMain {
        width: 100%;
        height: calc(100% - 120px);
      }
    }
    @extend %scrollbar;
    .dataBox {
      width: 100%;
      height: 200px;
    }
    img {
      width: 60%;
      height: auto;
    }
    p {
      font-size: 14px;
      color: #999;
      margin-top: 10px;
    }
  }
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .svg {
    width: 600px;
    max-width: 100%;
  }
}

.el-alert {
  margin-bottom: 20px;
}

.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}
:deep(.el-card) {
  border: none;
}
.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  width: 50%;
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
