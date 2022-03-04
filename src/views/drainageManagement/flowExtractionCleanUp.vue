<template>
  <div class="page">

    <el-row :gutter="20">
      <el-col :span="span">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="流量提取" name="tab1">
            <cleanUpTab @submitSelect="submitSelect" />
          </el-tab-pane>
          <el-tab-pane label="流量解析" name="tab2">
            <cleanUpTab2 @submitSelect="submitSelect" />
          </el-tab-pane>
          <el-tab-pane label="流量清理" name="tab3">
            <cleanUpTab3 @submitSelect="submitSelect" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col v-if="showlogPanel" :span="24-span">
        <log-panel
          ref="logPanel"
          :start-now-time="startNowTime"
          :query-log-type="queryLogType"
          :showlog-panel="showlogPanel"
          :file-name="fileName"
          @closeLogPanel="closeLogPanel"
        />
        <!-- <el-card
          shadow="always"
          class="logPanel commonHeight"
          style="height:calc(100vh - 200px)"
        >
          <div slot="header" class="clearfix">
            <span>日志面板</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="closeLogPanel">关闭</el-button>
          </div>
          <div class="contentText">
            <span>{{ time +'&nbsp;' }}</span>
            <span>{{ fileName+'开始...' }}</span>
          </div>
          <div v-for="(item,index) in logList" :key="index" class="text item">
            <span>{{ item }}</span>
          </div> -->
        <!-- <div v-for="o in 15" :key="o" class="text item">
            <span>{{ time +'&nbsp;' }}</span>
            <span v-if="activeName=='tab1'">{{ '流量提取进行中...... ' }}</span>
            <span v-if="activeName=='tab2'">{{ ' 文件：测试日志文件1解析开始...... ' }}</span>
            <span v-if="activeName=='tab3'">{{ ' 流量清理进行中...... ' }}</span>
          </div> -->
        <!-- </el-card> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import cleanUpTab from '@/views/drainageManagement/components/cleanUpTab.vue'
import cleanUpTab2 from '@/views/drainageManagement/components/cleanUpTab2.vue'
import cleanUpTab3 from '@/views/drainageManagement/components/cleanUpTab3.vue'
import logPanel from '@/views/drainageManagement/logPanel.vue'
export default {
  components: {
    cleanUpTab,
    cleanUpTab2,
    cleanUpTab3,
    logPanel
  },
  data() {
    return {
      activeName: 'tab1',
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
      startNowTime: null,
      span: 24,
      showlogPanel: false,
      queryLogType: null

    }
  },
  mounted() {
  },
  methods: {

    submitSelect(val) {
      if (val.status == 'success') {
        this.showlogPanel = true
        this.span = 16
        this.startNowTime = this.$dayjs().format('HH:mm:ss')
      }
      if (val.rows) {
        if (this.activeName == 'tab1') {
          this.fileName = val.rows[0].flowTaskName
          this.queryLogType = 1
        } else if (this.activeName == 'tab2') {
          this.fileName = '解析流量'
          this.queryLogType = 2
        } else {
          this.fileName = '流量清理'
          this.queryLogType = 3
        }
      }
    },
    closeLogPanel(val) {
      this.queryLogType = null
      this.showlogPanel = false
      this.span = 24
    },
    handleClick(tab) {
      this.$refs.logPanel.clearQueryLog()
      this.closeLogPanel()
    }
  }

}
</script>

