const Mock = require('mockjs')
// 资产流程图 G6
const assetDataList = []
const childNodelevel1 = []
const childNodelevel2 = []
const childNodelevel3 = []
const childNodelevel4 = []
const assetDataListCount = 1
const treeData = {
  'id':'1',
  "name": "电子权益卡销售页面",
  'level':1,
  'nodeType':1,
  'source':"电子权益卡销售页面",
  "children": [
    {
      "name": "服务1",
      'source':"电子权益卡销售页面",
      'level':2,
      'nodeType':2,
      'id':'2',
      "children": [
        { 'id':'43',"name": "后台" ,'level':3,'nodeType':3,'source':"电子权益卡销售页面",
          "children": [
            {'id':'3', "name": "数据库",'level':3 ,'nodeType':4,'source':"电子权益卡销售页面",},
            { 'id':'42',"name": "数据库" ,'level':3,'nodeType':4,'source':"电子权益卡销售页面",},
           ]
        },
        { 'id':'44',"name": "后台" ,'level':3,'nodeType':3,'source':"电子权益卡销售页面",},
        { 'id':'45',"name": "后台" ,'level':3,'nodeType':3,'source':"电子权益卡销售页面",}
        // { "name": "数据库" }
        // { "name": "Decision trees" },
        // { "name": "Naive Bayes" },
        // { "name": "K nearest neighbor" },
        // { "name": "Probabilistic neural network" },
        // { "name": "Support vector machine" }
      ]
    },
    {
      "name": "服务2",
      'source':"电子权益卡销售页面",
      'level':2,
      'nodeType':2,
      'id':'5',
      "children": [
        {
          "name": "数据库",
          'source':"电子权益卡销售页面",
          'level':3,
          'nodeType':4,
          'id':'6',
          "children": [
            {'id':'7', "name": "表" ,'level':4,'nodeType':5,'source':"电子权益卡销售页面",},
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
          'nodeType':4,
          'id':'8',
          "children": [
            { 'id':'9',"name": "表",'level':4,'nodeType':5,'source':"电子权益卡销售页面",'parentId':'8'},
            { 'id':'10',"name": "表" ,'level':4,'nodeType':5,'source':"电子权益卡销售页面",}
          ]
        },
        {
          "name": "数据库",
          'source':"电子权益卡销售页面",
          'level':3,
          'nodeType':4,
          'id':'11',
          "children": [
            {'id':'12', "name": "表",'level':5 ,'nodeType':5,'source':"电子权益卡销售页面",},
            // { "name": "表" },
            // { "name": "表" }
          ]
        }
      ]
    },
    {
      "name": "服务3",
      'source':"电子权益卡销售页面",
      'level':2,
      'nodeType':2,
      "children": [
        { "name": "数据库" ,'level':3,'nodeType':4,'source':"电子权益卡销售页面",},
        // { "name": "数据库" },
        // { "name": "数据库" },
        // { "name": "数据库" }
      ]
    }
  ]
}
const data = {
  // 节点的先后顺序与位置有关，应该从左到右，从上到下列举
  nodes: [
      {id: "yy", name: "页面资产", layType: "lay-1",'level':1,},
      {id: "nn", name: "销售页面", layType: "lay-1",'level':1},
      {id: "wg", name: "页面1", layType: "lay-1",'level':1},
      {id: "wp", name: "页面2", layType: "lay-1",'level':1},
      {id: "gg", name: "服务1", layType: "lay-2",'level':2},
      {id: "bb", name: "服务2", layType: "lay-2",'level':2},
      {id: "mm", name: "服务3", layType: "lay-2",'level':2},
      {id: "jj", name: "服务4", layType: "lay-2",'level':2},
      {id: "jm", name: "服务5", layType: "lay-2",'level':2},
      {id: "w", name: "数据库1", layType: "lay-3",'level':3},
      {id: "qz", name: "数据库2", layType: "lay-3",'level':3},
      {id: "bd", name: "数据库3", layType: "lay-3",'level':3},
      {id: "nx", name: "表1", layType: "lay-4",'level':4},
      {id: "ne", name: "表2", layType: "lay-4",'level':4},
      {id: "ez", name: "表3", layType: "lay-4",'level':4},
      {id: "ex", name: "表4", layType: "lay-4",'level':4},
      {id: "wsn", name: "字段1", layType: "lay-5",'level':5},
      {id: "sz", name: "字段2", layType: "lay-5",'level':5},
  ],
  edges: [
      {source: "yy", target: "gg",label:'调用'},
      {source: "yy", target: "bb",label:'调用'},
      {source: "nn", target: "bb",label:'调用'},
      {source: "nn", target: "gg",label:'调用'},
      {source: "wg", target: "mm",label:'调用'},
      {source: "wg", target: "jj",label:'调用'},
      {source: "wp", target: "mm",label:'调用'},
      {source: "wp", target: "jj",label:'调用'},
      {source: "bb", target: "w",label:'调用'},
      {source: "mm", target: "w",label:'调用'},
      {source: "jj", target: "bd",label:'调用'},
      {source: "jm", target: "bd",label:'调用'},
      {source: "w", target: "ez",label:'调用'},
      {source: "w", target: "ne",label:'调用'},
      {source: "qz", target: "ez",label:'调用'},
      {source: "qz", target: "ne",label:'调用'},
      {source: "ez", target: "sz",label:'调用'},
      {source: "ex", target: "sz",label:'调用'},
      {source: "ne", target: "wsn",label:'调用'},
      {source: "nx", target: "wsn",label:'只读'},
  ],
};


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
        data: data

      }
    }
  },

  {
    url: '/vue-element-admin/drainage-test/treeDataList',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: treeData

      }
    }
  }
]

