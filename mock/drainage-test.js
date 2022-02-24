const Mock = require('mockjs')

const flowExtractionList = []
const cleanUpTab2List = []
const flowExtractionListCount = 15
const cleanUpTab2ListCount = 40

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

