const Mock = require('mockjs')
// 资产流程图 G6
const assetDataList = []
const childNodelevel1 = []
const childNodelevel2 = []
const childNodelevel3 = []
const childNodelevel4 = []
const assetDataListCount = 1
const treeData = {
  "name": "电子权益卡销售页面",
  'level':1,
  'source':"电子权益卡销售页面",
  "children": [
    {
      "name": "服务",
      'source':"电子权益卡销售页面",
      'level':2,
      "children": [
        { "name": "数据库",'level':3 ,'source':"电子权益卡销售页面",},
        { "name": "数据库" ,'level':3,'source':"电子权益卡销售页面",},
        // { "name": "数据库" }
        // { "name": "Decision trees" },
        // { "name": "Naive Bayes" },
        // { "name": "K nearest neighbor" },
        // { "name": "Probabilistic neural network" },
        // { "name": "Support vector machine" }
      ]
    },
    {
      "name": "服务",
      'source':"电子权益卡销售页面",
      'level':2,
      "children": [
        {
          "name": "数据库",
          'source':"电子权益卡销售页面",
          'level':3,
          "children": [
            { "name": "表" ,'level':4,'source':"电子权益卡销售页面",},
            // { "name": "表" },
            // { "name": "表" },
            // { "name": "Different modeling methods" },
            // { "name": "Different training sets" },
            // { "name": "Different feature sets" }
          ]
        },
        {
          "name": "数据库",
          'source':"电子权益卡销售页面",
          'level':3,
          "children": [
            { "name": "表",'level':4,'source':"电子权益卡销售页面",},
            { "name": "表" ,'level':4,'source':"电子权益卡销售页面",}
          ]
        },
        {
          "name": "数据库",
          'source':"电子权益卡销售页面",
          'level':3,
          "children": [
            { "name": "表",'level':4 ,'source':"电子权益卡销售页面",},
            // { "name": "表" },
            // { "name": "表" }
          ]
        }
      ]
    },
    {
      "name": "服务",
      'source':"电子权益卡销售页面",
      'level':2,
      "children": [
        { "name": "数据库" ,'level':3,'source':"电子权益卡销售页面",},
        // { "name": "数据库" },
        // { "name": "数据库" },
        // { "name": "数据库" }
      ]
    }
  ]
}


// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'
for (let i = 0; i < 4; i++) {
  childNodelevel4.push(Mock.mock({
    id: '@increment(10)',
    'source':"电子权益卡销售页面",
    level:5,
    'name|1': ['字段1', '字段2', '字段3', '字段4'],
    children: []
   }))
}
for (let i = 0; i < 4; i++) {
  childNodelevel3.push(Mock.mock({
    id: '@increment(10)',
    'source':"电子权益卡销售页面",
    level:4,
    'name|1': ['表1', '表2', '表3', '表4'],
    children: childNodelevel4
   }))
}
for (let i = 0; i < 5; i++) {
  childNodelevel3.push(Mock.mock({
    id: '@increment(10)',
    'source':"电子权益卡销售页面",
    'name|1': ['数据库1', '数据库2', '数据库3', '数据库4'],
    level:3,
    children: childNodelevel4
   }))
}
for (let i = 0; i < 3; i++) {
  childNodelevel2.push(Mock.mock({
    id: '@increment(10)',
    'source':"电子权益卡销售页面",
    level:2,
    'name|1': ['服务1', '服务2', '服务3', '服务4'],
    children: childNodelevel3
   }))
}

for (let i = 0; i < 1; i++) {
  assetDataList.push(Mock.mock({
    id: '@increment(10)',
    'source':"电子权益卡销售页面",
    level:1,
    name:'电子权益卡销售页面',
    children: childNodelevel2
  }))
}


module.exports = [
  {
    url: '/vue-element-admin/drainage-test/assetDataList',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: treeData

      }
    }
  }
]

