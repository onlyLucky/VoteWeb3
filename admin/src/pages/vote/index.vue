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
const tableData = ref<any[]>([])
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
    tableData.value = [
      {
        voteName: "春节联欢晚会节目评选",
        createUser: "admin",
        createTime: "2025-01-20",
        status: 1,
        type: 0
      },
      {
        voteName: "公司年度优秀员工投票",
        createUser: "admin",
        createTime: "2025-02-10",
        status: 0,
        type: 1
      },
      {
        voteName: "校园最受欢迎社团评选",
        createUser: "admin",
        createTime: "2025-02-05",
        status: 2,
        type: 0
      },
      {
        voteName: "社区环保活动最佳方案投票",
        createUser: "admin",
        createTime: "2025-02-15",
        status: 0,
        type: 2
      },
      {
        voteName: "最受欢迎的运动项目投票",
        createUser: "admin",
        createTime: "2025-02-01",
        status: 1,
        type: 1
      },
      {
        voteName: "最受欢迎的餐厅评选",
        createUser: "admin",
        createTime: "2025-02-20",
        status: 2,
        type: 0
      },
      {
        voteName: "最佳旅游目的地投票",
        createUser: "admin",
        createTime: "2025-02-18",
        status: 0,
        type: 1
      },
      {
        voteName: "最受欢迎的电影评选",
        createUser: "admin",
        createTime: "2025-02-12",
        status: 1,
        type: 2
      },
      {
        voteName: "最受欢迎的书籍评选",
        createUser: "admin",
        createTime: "2025-02-08",
        status: 2,
        type: 0
      },
      {
        voteName: "最受欢迎的音乐评选",
        createUser: "admin",
        createTime: "2025-02-25",
        status: 0,
        type: 1
      }
    ]
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
        <el-card v-loading="loading" shadow="never" class="search-wrapper">
          <el-form ref="searchFormRef" :inline="true" :model="searchData">
            <el-form-item prop="username" label="投票名称">
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
                新增投票
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
            <el-table :data="tableData">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column prop="voteName" label="投票名称" align="center" />
              <el-table-column prop="createUser" label="创建者" align="center" />
              <el-table-column prop="createTime" label="创建时间" align="center" />
              <el-table-column prop="roles" label="投票类型" align="center">
                <template #default="scope">
                  <el-tag type="primary" effect="plain" disable-transitions>
                    {{ scope.row.type === 0 ? "默认" : scope.row.type === 1 ? "多选" : "定时" }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="投票状态" align="center">
                <template #default="scope">
                  <el-tag v-if="scope.row.status === 0" type="warning" effect="plain" disable-transitions>
                    未开始
                  </el-tag>
                  <el-tag v-if="scope.row.status === 1" type="success" effect="plain" disable-transitions>
                    进行中
                  </el-tag>
                  <el-tag v-if="scope.row.status === 2" type="info" effect="plain" disable-transitions>
                    已结束
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="220" align="center">
                <template #default="scope">
                  <el-button type="success" text bg size="small">
                    {{ scope.row.status === 0 ? "开始" : scope.row.status === 1 ? "结束" : "开始" }}
                  </el-button>
                  <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">
                    修改
                  </el-button>
                  <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pager-wrapper">
            <el-pagination
              background
              :layout="paginationData.layout"
              :page-sizes="paginationData.pageSizes"
              :total="paginationData.total"
              :page-size="paginationData.pageSize"
              :current-page="paginationData.currentPage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-card>
        <!-- 新增/修改 -->
        <el-dialog
          v-model="dialogVisible"
          :title="formData.id === undefined ? '新增投票' : '修改投票'"
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
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
