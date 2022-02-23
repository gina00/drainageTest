<template>
  <div class="page">

    <el-row>
      <el-col :span="16" :gutter="20">
        <el-tabs type="border-card">
          <el-tab-pane label="流量提取">流量提取</el-tab-pane>
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
export default {

}
</script>

<style scoped>
.page{
  padding: 20px;
}
</style>
