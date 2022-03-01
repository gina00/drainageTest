<template>
  <div style="padding:20px;">
    <el-form
      ref="form"
      :model="formData"
      label-width="110px"
      class="content"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="流量配置类型">
            <div style="marign-bottom:10px;">
              <el-radio v-model="formData.extractRange" label="1">全流量配置</el-radio>
              <el-date-picker
                v-model="formData.allFlowDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :disabled="formData.extractRange!='1'"
              />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="">
          <el-col :span="24">
            <div>
              <el-radio v-model="formData.extractRange" label="2" style="margin-right:45px;">指定流量</el-radio>
              <el-date-picker
                v-model="formData.someFlowDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :disabled="formData.extractRange!='2'"
              />
            </div>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="">
          <el-col :span="24">
            <div>
              <p>流量业务范围</p>
              <el-input
                v-model="formData.flowBussiness"
                type="textarea"
                placeholder="请输入流量业务范围"
                :rows="10"
                :disabled="formData.extractRange!='2'"
              />
              <p>备注：不同的业务功能号，以逗号隔开。</p>
            </div>
          </el-col>
        </el-form-item>
      </el-row>

    </el-form>
    <el-row class="btnClass" style="padding: 10px 0 20px 0;">
      <el-button @click="cancel()">取消</el-button>
      <el-button type="primary" @click="confirm()">确定</el-button>
    </el-row>
  </div>
</template>

<script>
import { dict } from '@/api/drainage-test'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    paramData: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      formData: {
        extractRange: '1',
        allFlowDate: '',
        someFlowDate: '',
        flowBussiness: 1
      },
      ruleTypeOptions: [],
      ruleOptions: []
      // rules: {
      //   taskDesc: [{ required: true, message: '请输入FPA功能点', trigger: 'blur' }]
      // }
    }
  },
  watch: {
    paramData() {
      this.initForm()
    }
  },
  mounted() {
    this.initForm()
  },
  methods: {
    initForm() {
      this.getDictData()
      if (this.paramData.clickType == 'add') {
        this.formData = JSON.parse(JSON.stringify(this.paramData))
        this.$set(this.formData, 'extractRange', '1')
      } else {
        // this.$refs['form'].resetFields()
        this.formData = Object.assign({}, this.formData, this.paramData)
      }
    },
    getDictData() {
      dict().then(response => {
        this.ruleOptions = response.data[1]
        this.ruleTypeOptions = response.data[2]
      })
    },
    cancel() {
      this.$emit('submitStatus', { status: 'cancel', row: {}})
    },
    close() {
      debugger
      this.formData = Object.assign({}, this.formData, {})
    },
    confirm() {
      this.$refs.form.validate((valid, message) => {
        if (valid) {
          this.$emit('submitStatus', { status: 'success', row: this.formData })
          // this.axios
          //   .post('/asset-develop/modifyreport/function/update', this.formData)
          //   .then(response => {
          //     if (response.respResult == '1') {
          //       this.$message.success(response.respData)
          //     }
          //   })
          //   .finally(() => {
          //     this.$emit('submitStatus', { status: 'success', row: this.formData })
          //   })
        } else {
          this.$message.error('必填项不能为空')
          return false
        }
      })
    }
  }
}
</script>

<style lang='scss'>
.btnClass {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    background: #fff;
    position: absolute;
    bottom: 10px;
    right: 20px;
  }
  .radioPanel{
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    .el-radio{
      margin-top: 5px;
    }
  }

</style>
