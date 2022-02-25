<template>
  <div class="page baseDataPanel">
    <el-row :gutter="20">
      <el-col :span="span">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-form ref="form" inline :model="formData">
              <el-form-item label="同步时间">
                <el-date-picker
                  v-model="formData.synchronousDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  style="float: right;"
                  type="primary"
                  size="small"
                  @click="start()"
                >
                  基准数据同步
                </el-button>
              </el-form-item>
            </el-form>

          </div>
          <el-row :gutter="20">
            <el-col :span="12" style="border-right:1px solid #eeeeee">
              <el-checkbox v-model="checked1">配置类</el-checkbox>
              <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :render-content="renderContent"
              />
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked2">用户资料类</el-checkbox>
              <el-tree
                :data="data2"
                show-checkbox
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :render-content="renderContent"
              />
            </el-col>
          </el-row>
          <!-- </el-card></div></el-card> -->
        </el-card>
      </el-col>
      <el-col :span="24-span">
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
            <span>{{ '同步进行中...... ' }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { pageQueryTree } from '@/api/drainage-test'
export default {
  data() {
    const data = [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }]
    return {
      formData: {
        synchronousDate: ''
      },
      span: 24,
      fileName: null,
      time: null,
      checked1: false,
      checked2: false,
      isShowlogPanel: false,
      data: JSON.parse(JSON.stringify(data)),
      data2: JSON.parse(JSON.stringify(data)),
      defaultExpandedKey: null,
      defaultExpandedKey2: null
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      pageQueryTree().then(response => {
        this.data = JSON.parse(JSON.stringify(response.data))
        this.defaultExpandedKey = this.data[0].id
        this.data2 = JSON.parse(JSON.stringify(response.data))
        this.defaultExpandedKey2 = this.data2[0].id
      }).finally(() => {
        this.loading = false
      })
    },
    start() {
      this.isShowlogPanel = true
      this.span = 16
      this.time = this.$dayjs().format('HH:mm:ss')
      this.fileName = '同步 '
    },
    closeLogPanel() {
      this.isShowlogPanel = false
      this.span = 24
    }
  }
}
</script>

<style lang='scss' scoped>
.baseDataPanel{
  .el-form-item {
      margin-bottom: 0px !important;
  }
}
</style>
