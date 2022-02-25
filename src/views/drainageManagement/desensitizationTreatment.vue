<template>
  <div class="page">

    <el-row :gutter="20">
      <el-col :span="span">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="流量报文脱敏" name="tab1">
            <flowdesTab1 :active-name="activeName" @submitSelect="submitSelect" />
          </el-tab-pane>
          <el-tab-pane label="数据表脱敏" name="tab2">
            <flowdesTab2 :active-name="activeName" @submitSelect="submitSelect" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col v-if="isShowlogPanel" :span="24-span">
        <el-card shadow="always" class="logPanel">
          <div slot="header" class="clearfix">
            <span>日志面板</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="closeLogPanel">关闭</el-button>
          </div>
          <div class="contentText">
            <span>{{ time +'&nbsp;' }}</span>
            <span>{{ fileName+'开始...' }}</span>
          </div>
          <div v-for="o in 15" :key="o" class="text item">
            <span>{{ time +'&nbsp;' }}</span>
            <span v-if="activeName=='tab1'">{{ '脱敏处理进行中...... ' }}</span>
            <span v-if="activeName=='tab2'">{{ ' 脱敏处理进行中...... ' }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import flowdesTab1 from '@/views/drainageManagement/components/flowdesTab1.vue'
import flowdesTab2 from '@/views/drainageManagement/components/flowdesTab2.vue'
export default {
  components: {
    flowdesTab1,
    flowdesTab2
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
        if (this.activeName == 'tab1') {
          this.fileName = '脱敏处理'
        } else if (this.activeName == 'tab2') {
          this.fileName = '脱敏处理'
        } else {
          this.fileName = '流量清理'
        }
      }
    },
    closeLogPanel() {
      this.isShowlogPanel = false
      this.span = 24
    },
    handleClick() {
      this.closeLogPanel()
    }
  }

}
</script>

<style lang='scss' scoped>
.page{
  padding: 20px;
}
.logPanel{

  line-height: 23px;
  font-size: 14px;
}
</style>
