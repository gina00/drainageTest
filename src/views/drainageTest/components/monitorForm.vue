<template>
  <div style="padding:20px;">
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="130px"
      class="content"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="请求类型" prop="reqType">
            <el-select
              v-model="formData.reqType"
              placeholder="请选择请求类型"
            >
              <el-option
                v-for="item in reqTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="业务/服务/功能号" prop="functionCode">
            <el-input
              v-model="formData.functionCode"
              clearable
              maxlength="1024"
              type="text"
              placeholder="请输入业务/服务/功能号"
            />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div style="text-align:right;">
      <el-button @click="cancel()">取消</el-button>
      <el-button type="primary" @click="confirm()">确定</el-button>
    </div>
    <!-- <el-row class="btnClass" style="padding: 10px 0 20px 0;">
      <el-button @click="cancel()">取消</el-button>
      <el-button type="primary" @click="confirm()">确定</el-button>
    </el-row> -->
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
        reqType: 1,
        functionCode: ''
      },
      reqTypeOptions: [],
      rules: {
        functionCode: [{ required: true, message: '请输入业务/服务/功能号', trigger: 'blur' }]
      }
    }
  },
  watch: {
    paramData() {
      this.initForm()
    }
  },
  mounted() {
    this.initForm()
    this.getDictData()
  },
  methods: {
    getDictData() {
      dict().then(response => {
        this.reqTypeOptions = response.data[3]
      })
    },
    initForm() {
      if (this.paramData.clickType == 'add') {
        this.formData = JSON.parse(JSON.stringify(this.paramData))
        this.formData.reqType = 1
      } else {
        this.$refs['form'].resetFields()
        this.formData = Object.assign({}, this.formData, this.paramData)
      }
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
    },
    cancel() {
      this.$emit('submitStatus', { status: 'cancel', row: {}})
    }
  }
}
</script>

<style lang='scss' scoped>
.btnClass {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    background: #fff;
    position: absolute;
    bottom: 10px;
    right: 20px;
  }
</style>
