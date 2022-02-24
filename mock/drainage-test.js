const Mock = require('mockjs')
// 流程提取任务列表
const flowExtractionList = []
const flowExtractionListCount = 15
// 流程提取解析列表
const cleanUpTab2List = []
const cleanUpTab2ListCount = 40
// 脱敏规则列表
const desensitizationRuleList = []

// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'
for (let i = 0; i < flowExtractionListCount; i++) {
  flowExtractionList.push(Mock.mock({
    flowTaskName: '流量提取任务@increment',
    taskDesc: '流量提取任务20220210',
    targetHost: '10.1.1.113',
    loginUser: 'admin',
    loginPassWord: '111111',
    extractPath: '/root',
    extractRange: '2',
    fileType: 'root.zip'
  }))
}
for (let i = 0; i < cleanUpTab2ListCount; i++) {
  cleanUpTab2List.push(Mock.mock({
    flowTaskName: '@increment'
  }))
}
for (let i = 0; i < flowExtractionListCount; i++) {
  desensitizationRuleList.push(Mock.mock({
    ruleCode: '@increment(100000)',
    origin: '<msisdn>@id(10000000)</msisdn>',
    rule: '@integer(1, 3)',
    ruleType: '@integer(1, 2)',
    newVal: '<msisdn>@increment(10000000)</msisdn>'
  }))
}
module.exports = [
  {
    url: '/vue-element-admin/drainage-test/flowExtractTaskList',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          list: flowExtractionList
          // list: [
          //   {
          //     flowTaskName: '流量提取任务20220210',
          //     taskDesc: '流量提取任务20220210',
          //     targetHost: '10.1.1.113',
          //     loginUser: 'admin',
          //     loginPassWord: '111111',
          //     extractPath: '/root',
          //     extractRange: '2',
          //     fileType: 'root.zip'
          //   },
          //   {
          //     flowTaskName: '流量提取任务20220208',
          //     taskDesc: '流量提取任务20220208',
          //     targetHost: '10.1.9.191',
          //     loginUser: 'admin',
          //     loginPassWord: '111111',
          //     extractPath: '/root',
          //     extractRange: '2',
          //     fileType: 'root.zip'
          //   },
          //   {
          //     flowTaskName: '流量提取任务20220215',
          //     taskDesc: '流量提取任务20220215',
          //     targetHost: '10.1.2.176',
          //     loginUser: 'admin',
          //     loginPassWord: '111111',
          //     extractPath: '/root',
          //     extractRange: '2',
          //     fileType: 'root.zip'
          //   },
          //   {
          //     flowTaskName: '流量提取任务20220215',
          //     taskDesc: '流量提取任务20220215',
          //     targetHost: '10.1.2.176',
          //     loginUser: 'admin',
          //     loginPassWord: '111111',
          //     extractPath: '/root',
          //     extractRange: '2',
          //     fileType: 'root.zip'
          //   },
          //   {
          //     flowTaskName: '流量提取任务20220215',
          //     taskDesc: '流量提取任务20220215',
          //     targetHost: '10.1.2.176',
          //     loginUser: 'admin',
          //     loginPassWord: '111111',
          //     extractPath: '/root',
          //     extractRange: '2',
          //     fileType: 'root.zip'
          //   }
          // ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/drainage-test/cleanUpTab2List',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: cleanUpTab2List
      }
    }
  },
  {
    url: '/vue-element-admin/drainage-test/dict',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          // 1-脱敏规则字典
          1: [
            { label: '仿真数据', value: 1 },
            { label: '数据屏蔽', value: 2 },
            { label: '固定数据', value: 3 },
            { label: '随机数据', value: 4 }
          ],
          // 1-规则类型字典
          2: [
            { label: '提交节点', value: 1 },
            { label: '数据表字段', value: 2 }
          ]
        }
      }
    }
  },
  {
    url: '/vue-element-admin/drainage-test/desensitizationRuleList',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: desensitizationRuleList
      }
    }
  },

  {
    url: '/vue-element-admin/article/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

