<template>
  <div class="page">

    <el-row>
      <el-col :span="16" :gutter="20">
        <el-tabs type="border-card">
          <el-tab-pane label="流量提取">
            <cleanUpTab />
          </el-tab-pane>
          <el-tab-pane label="流量解析">流量解析</el-tab-pane>
          <el-tab-pane label="流量清理">流量清理</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8">
        <div>日志面板</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import cleanUpTab from '@/views/drainageManagement/components/cleanUpTab.vue'
export default {
  components: {
    cleanUpTab
  },
  data() {
    return {
      loading: false,
      tableData: [{
        name: '流量提取任务20220210',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: '流量提取任务20220208',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '流量提取任务20220220',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        name: '流量提取任务20220215',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }

}
</script>

<style lang='scss' scoped>
.page{
  padding: 20px;

}
</style>
