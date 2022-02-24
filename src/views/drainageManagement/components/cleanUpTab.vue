<template>
  <div>
    <div class="titleAndOperation">
      <span>流量提取任务列表</span>
      <div>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="clickShowDrawer('add', {})"
        >
          新增
        </el-button>
        <el-button
          size="small"
          @click="startFlowExtract()"
        >
          开始提取流量
        </el-button>
      </div>

    </div>

    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="flowTaskName" label="任务名称" min-width="180" align="center" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-edit"
            title="编辑"
            @click="clickShowDrawer('edit',scope.row)"
          />
          <el-button
            type="text"
            icon="el-icon-delete"
            title="删除"
            @click="remove(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      ref="drawer"
      :title="drawerData.title"
      :visible.sync="drawerData.visible"
      direction="rtl"
      custom-class="demo-drawer"
      size="60%"
    >
      <component
        :is="componentId"
        ref="currentDrawer"
        :param-data="drawerData.data"
        @submitStatus="submitStatus"
      />
    </el-drawer>
  </div>
</template>

<script>
import { flowExtractTaskList } from '@/api/drainage-test'
import taskForm from '@/views/drainageManagement/components/taskForm.vue'

export default {
  components: {
    taskForm
  },
  data() {
    return {
      loading: false,
      componentId: '',
      tableData: [
        {
          flowTaskName: '流量提取任务20220210',
          taskDesc: '流量提取任务20220210',
          targetHost: '10.1.1.113',
          loginUser: 'admin',
          loginPassWord: '111111',
          extractPath: '/root',
          extractRange: '2',
          fileType: 'root.zip'
        },
        {
          flowTaskName: '流量提取任务20220208',
          taskDesc: '流量提取任务20220208',
          targetHost: '10.1.9.191',
          loginUser: 'admin',
          loginPassWord: '111111',
          extractPath: '/root',
          extractRange: '2',
          fileType: 'root.zip'
        },
        {
          flowTaskName: '流量提取任务20220215',
          taskDesc: '流量提取任务20220215',
          targetHost: '10.1.2.176',
          loginUser: 'admin',
          loginPassWord: '111111',
          extractPath: '/root',
          extractRange: '2',
          fileType: 'root.zip'
        }],
      drawerData: {
        visible: false,
        title: '',
        data: {}
      }
    }
  },
  mounted() {
    // this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      flowExtractTaskList().then(response => {
        this.tableData = response.data.items
      })
    },
    // 根据不同的点击操作显示不同的弹窗
    clickShowDrawer(clickType, data) {
      this.drawerData.visible = !this.drawerData.visible
      if (clickType == 'add') {
        this.componentId = 'taskForm'
        this.drawerData.title = '新增流量任务'
        this.drawerData.data = {}
        this.drawerData.data.clickType = 'add'
      } else if (clickType == 'edit') {
        this.componentId = 'taskForm'
        this.drawerData.title = '编辑流量任务'
        this.drawerData.data = data
        this.drawerData.data.clickType = 'edit'
      }
    },
    // openDrawer() {
    //   var _this = this
    //   const currentDrawer = _this.$refs.currentDrawer
    //   currentDrawer.open()
    // },
    // closeDrawer() {
    //   const currentDrawer = this.$refs['currentDrawer']
    //   currentDrawer.close()
    // },
    submitStatus(val) {
      if (val.status == 'success') {
        // 点击确定修改后返回
        this.drawerData.visible = !this.drawerData.visible
        this.tableData.push(val.row)
        // this.clickDataMap.set(this.drawerData.clickCount, val.row)
        // this.query()
      } else {
        // // 点击取消
        this.drawerData.visible = !this.drawerData.visible
        const currentDrawer = this.$refs['currentDrawer']
        currentDrawer.initForm()
      }
    },
    startFlowExtract() {}

  }
}
</script>

<style lang='scss' scoped>
 .titleAndOperation{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

</style>
