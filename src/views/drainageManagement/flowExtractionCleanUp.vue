<template>
  <div class="page">

    <el-row :gutter="20">
      <el-col :span="span">
        <el-tabs type="border-card">
          <el-tab-pane label="流量提取">
            <cleanUpTab @submitSelect="submitSelect" />
          </el-tab-pane>
          <el-tab-pane label="流量解析">流量解析</el-tab-pane>
          <el-tab-pane label="流量清理">流量清理</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col v-if="isShowlogPanel" :span="24-span">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>日志面板</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="closeLogPanel">关闭</el-button>
          </div>
          <div>
            <span>{{ time +'&nbsp;' }}</span>
            <span>{{ fileName+'开始...' }}</span>
          </div>
          <div v-for="o in 15" :key="o" class="text item">
            <span>{{ time +'&nbsp;' }}</span>
            {{ '流量提取进行中...... ' }}
          </div>
        </el-card>
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
      }],
      fileName: '',
      time: null,
      span: 24,
      isShowlogPanel: false
    }
  },
  methods: {
    submitSelect(val) {
      if (val.status == 'success') {
        this.isShowlogPanel = true
        this.span = 16
        this.time = this.$dayjs().format('HH:mm:ss')
      }
      if (val.rows) {
        this.fileName = val.rows[0].flowTaskName
      }
    },
    closeLogPanel() {
      this.isShowlogPanel = false
      this.span = 24
    }
  }

}
</script>

<style lang='scss' scoped>
.page{
  padding: 20px;

}
</style>
