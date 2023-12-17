const Mock = require('mockjs')
// 资产流程图 G6
const assetTableList = []
const childNodelevel2 = []
const childNodelevel3 = []
const childNodelevel4 = []
const nodes = []
// const graphData2 = {}
// const graphData3 = {}
const treeData = {
  'id': '1',
  'name': '电子权益卡销售页面',
  'level': 1,
  'nodeType': 1,
  'source': '电子权益卡销售页面',
  'children': [
    {
      'name': '服务1',
      'source': '电子权益卡销售页面',
      'level': 2,
      'nodeType': 2,
      'id': '2',
      'children': [
        { 'id': '43', 'name': '后台', 'level': 3, 'nodeType': 3, 'source': '电子权益卡销售页面',
          'children': [
            { 'id': '3', 'name': '数据库', 'level': 3, 'nodeType': 4, 'source': '电子权益卡销售页面' },
            { 'id': '42', 'name': '数据库', 'level': 3, 'nodeType': 4, 'source': '电子权益卡销售页面' }
          ]
        },
        { 'id': '44', 'name': '后台', 'level': 3, 'nodeType': 3, 'source': '电子权益卡销售页面' },
        { 'id': '45', 'name': '后台', 'level': 3, 'nodeType': 3, 'source': '电子权益卡销售页面' }
        // { "name": "数据库" }
        // { "name": "Decision trees" },
        // { "name": "Naive Bayes" },
        // { "name": "K nearest neighbor" },
        // { "name": "Probabilistic neural network" },
        // { "name": "Support vector machine" }
      ]
    },
    {
      'name': '服务2',
      'source': '电子权益卡销售页面',
      'level': 2,
      'nodeType': 2,
      'id': '5',
      'children': [
        {
          'name': '数据库',
          'source': '电子权益卡销售页面',
          'level': 3,
          'nodeType': 4,
          'id': '6',
          'children': [
            { 'id': '7', 'name': '表', 'level': 4, 'nodeType': 5, 'source': '电子权益卡销售页面' }
            // { "name": "表" },
            // { "name": "表" },
            // { "name": "Different modeling methods" },
            // { "name": "Different training sets" },
            // { "name": "Different feature sets" }
          ]
        },
        {
          'name': '数据库',
          'source': '电子权益卡销售页面',
          'level': 3,
          'nodeType': 4,
          'id': '8',
          'children': [
            { 'id': '9', 'name': '表', 'level': 4, 'nodeType': 5, 'source': '电子权益卡销售页面', 'parentId': '8' },
            { 'id': '10', 'name': '表', 'level': 4, 'nodeType': 5, 'source': '电子权益卡销售页面' }
          ]
        },
        {
          'name': '数据库',
          'source': '电子权益卡销售页面',
          'level': 3,
          'nodeType': 4,
          'id': '11',
          'children': [
            { 'id': '12', 'name': '表', 'level': 5, 'nodeType': 5, 'source': '电子权益卡销售页面' }
            // { "name": "表" },
            // { "name": "表" }
          ]
        }
      ]
    },
    {
      'name': '服务3',
      'source': '电子权益卡销售页面',
      'level': 2,
      'nodeType': 2,
      'children': [
        { 'name': '数据库', 'level': 3, 'nodeType': 4, 'source': '电子权益卡销售页面' }
        // { "name": "数据库" },
        // { "name": "数据库" },
        // { "name": "数据库" }
      ]
    }
  ]
}
const graphData = {
  // 节点的先后顺序与位置有关，应该从左到右，从上到下列举
  nodes: [
    { id: '1', name: '页面资产', layType: 'lay-1', 'level': 1 },
    { id: '2', name: '销售页面', layType: 'lay-1', 'level': 1 },
    { id: '3', name: '页面1', layType: 'lay-1', 'level': 1 },
    { id: '4', name: '页面2', layType: 'lay-1', 'level': 1 },
    { id: '5', name: '服务1', layType: 'lay-2', 'level': 2 },
    { id: '6', name: '服务2', layType: 'lay-2', 'level': 2 },
    { id: '7', name: '服务3', layType: 'lay-2', 'level': 2 },
    { id: '8', name: '服务4', layType: 'lay-2', 'level': 2 },
    { id: '9', name: '服务5', layType: 'lay-2', 'level': 2 },
    { id: '10', name: '数据库1', layType: 'lay-3', 'level': 3 },
    { id: '11', name: '数据库2', layType: 'lay-3', 'level': 3 },
    { id: '12', name: '数据库3', layType: 'lay-3', 'level': 3 },
    { id: '13', name: '表1', layType: 'lay-4', 'level': 4 },
    { id: '14', name: '表2', layType: 'lay-4', 'level': 4 },
    { id: '15', name: '表3', layType: 'lay-4', 'level': 4 },
    { id: '16', name: '表4', layType: 'lay-4', 'level': 4 },
    { id: '17', name: '字段1', layType: 'lay-5', 'level': 5 },
    { id: '18', name: '字段2', layType: 'lay-5', 'level': 5 }
  ],
  edges: [
    { source: '1', target: '5', label: '调用' },
    { source: '1', target: '6', label: '调用' },
    { source: '2', target: '6', label: '调用' },
    { source: '2', target: '5', label: '调用' },
    { source: '3', target: '7', label: '调用' },
    { source: '3', target: '8', label: '调用' },
    { source: '4', target: '7', label: '调用' },
    { source: '4', target: '8', label: '调用' },
    { source: '6', target: '10', label: '调用' },
    { source: '7', target: '10', label: '调用' },
    { source: '8', target: '12', label: '调用' },
    { source: '9', target: '12', label: '调用' },
    { source: '10', target: '15', label: '调用' },
    { source: '10', target: '14', label: '只读' },
    { source: '11', target: '15', label: '只读' },
    { source: '11', target: '14', label: '调用' },
    { source: '15', target: '18', label: '写入' },
    { source: '16', target: '18', label: '写入' },
    { source: '14', target: '17', label: '调用' },
    { source: '13', target: '17', label: '只读' }
  ]
}
const graphData1 = {
  // 节点的先后顺序与位置有关，应该从左到右，从上到下列举
  nodes: [
    { id: '1',
      name: '页面资产',
      layType: 'lay-1',
      'level': 1,
      hasParent: true,
      hasChild: true,
      parentExpand: true, // 父节点是否折叠
      childExpand: true, // 子节点是否折叠
      childIds: [],
      parentIds: []
    },
    { id: '5', name: '服务1', layType: 'lay-2', parentExpand: true, hasParent: true, hasChild: true, // 父节点是否折叠
      childExpand: true, // 子节点是否折叠
      'level': 2 },
    { id: '6', name: '服务2', layType: 'lay-2', 'level': 2, hasParent: true, hasChild: true, parentExpand: true, // 父节点是否折叠
      childExpand: true },
    { id: '10', name: '数据库1', layType: 'lay-3', 'level': 3, hasParent: true, hasChild: true, parentExpand: true, // 父节点是否折叠
      childExpand: true },
    { id: '14', name: '表2', layType: 'lay-4', 'level': 4, hasParent: true, hasChild: true, parentExpand: true, // 父节点是否折叠
      childExpand: true },
    { id: '15', name: '表3', layType: 'lay-4', 'level': 4, hasParent: true, hasChild: true, parentExpand: true, // 父节点是否折叠
      childExpand: true }
  ],
  edges: [
    { source: '1', target: '5', label: '调用' },
    { source: '1', target: '6', label: '调用' },
    { source: '6', target: '5', label: '调用' },
    { source: '6', target: '10', label: '调用' },
    { source: '10', target: '15', label: '调用' },
    { source: '10', target: '14', label: '只读' }
  ]
}
const graphData2 = {
  // 节点的先后顺序与位置有关，应该从左到右，从上到下列举
  nodes: [
    { id: '6', name: 'PO工作台页面', layType: 'lay-1', 'level': 1 },
    // { id: '5', name: '服务1', layType: 'lay-2', 'level': 2 },
    { id: '7', name: '服务2', layType: 'lay-2', 'level': 2 },
    { id: '10', name: '数据库1', layType: 'lay-3', 'level': 3 },
    { id: '14', name: '表2', layType: 'lay-4', 'level': 4 },
    { id: '15', name: '表3', layType: 'lay-4', 'level': 4 },
    { id: '17', name: '字段1', layType: 'lay-5', 'level': 5 },
    { id: '18', name: '字段2', layType: 'lay-5', 'level': 5 }
  ],
  edges: [
    { source: '6', target: '7', label: '调用' },
    { source: '6', target: '5', label: '调用' },
    { source: '7', target: '10', label: '调用' },
    { source: '10', target: '15', label: '调用' },
    { source: '10', target: '14', label: '只读' },
    { source: '15', target: '18', label: '写入' },
    { source: '14', target: '17', label: '调用' }
  ]
}
const graphData3 = {
  // 节点的先后顺序与位置有关，应该从左到右，从上到下列举
  nodes: [
    { id: '1', name: '页面资产', layType: 'lay-1', 'level': 1 },
    { id: '2', name: '销售页面', layType: 'lay-1', 'level': 1 },
    // { id: '5', name: '服务1', layType: 'lay-2', 'level': 2 },
    { id: '7', name: '资产服务', layType: 'lay-2', 'level': 2 },
    // { id: '8', name: '服务4', layType: 'lay-2', 'level': 2 },
    { id: '6', name: '数据库1', layType: 'lay-3', 'level': 3 },
    { id: '14', name: '表2', layType: 'lay-4', 'level': 4 },
    { id: '15', name: '表3', layType: 'lay-4', 'level': 4 },
    { id: '17', name: '字段1', layType: 'lay-5', 'level': 5 },
    { id: '18', name: '字段2', layType: 'lay-5', 'level': 5 }
  ],
  edges: [
    { source: '1', target: '7', label: '调用' },
    { source: '2', target: '7', label: '调用' },
    { source: '2', target: '5', label: '调用' },
    { source: '7', target: '6', label: '调用' },
    { source: '8', target: '6', label: '调用' },
    { source: '6', target: '15', label: '调用' },
    { source: '6', target: '14', label: '只读' },
    { source: '15', target: '18', label: '写入' },
    { source: '14', target: '17', label: '调用' }
  ]
}
const graphData4 = {
  // 节点的先后顺序与位置有关，应该从左到右，从上到下列举
  nodes: [
    { id: '10', name: 'SA服务', layType: 'lay-3', 'level': 3 },
    { id: '7', name: '数据库', layType: 'lay-4', 'level': 2 },
    { id: '6', name: '表', layType: 'lay-4', 'level': 4 },
    { id: '17', name: '字段1', layType: 'lay-5', 'level': 5 },
    { id: '18', name: '字段2', layType: 'lay-5', 'level': 5 }
  ],
  edges: [
    { source: '10', target: '7', label: '调用' },
    { source: '7', target: '6', label: '调用' },
    { source: '6', target: '17', label: '调用' },
    { source: '6', target: '18', label: '写入' }
  ]
}
for (let i = 0; i < 4; i++) {
  nodes.push(Mock.mock({
    id: '@increment(10)',
    'source': '电子权益卡销售页面',
    level: 5,
    'name|1': ['字段1', '字段2', '字段3', '字段4'],
    children: []
  }))
}

// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'
for (let i = 0; i < 4; i++) {
  childNodelevel4.push(Mock.mock({
    id: '@increment(10)',
    'source': '电子权益卡销售页面',
    level: 5,
    'name|1': ['字段1', '字段2', '字段3', '字段4'],
    children: []
  }))
}
for (let i = 0; i < 4; i++) {
  childNodelevel3.push(Mock.mock({
    id: '@increment(10)',
    'source': '电子权益卡销售页面',
    level: 4,
    'name|1': ['表1', '表2', '表3', '表4'],
    children: childNodelevel4
  }))
}
for (let i = 0; i < 5; i++) {
  childNodelevel3.push(Mock.mock({
    id: '@increment(10)',
    'source': '电子权益卡销售页面',
    'name|1': ['数据库1', '数据库2', '数据库3', '数据库4'],
    level: 3,
    children: childNodelevel4
  }))
}
for (let i = 0; i < 3; i++) {
  childNodelevel2.push(Mock.mock({
    id: '@increment(10)',
    'source': '电子权益卡销售页面',
    level: 2,
    'name|1': ['服务1', '服务2', '服务3', '服务4'],
    children: childNodelevel3
  }))
}

for (let i = 0; i < 15; i++) {
  assetTableList.push(Mock.mock({
    'id|+1': i + 1,
    'assetId|1': '6',
    'source': '电子权益卡销售页面',
    level: 1,
    menuId: '@increment(10)',
    path: 'BOP基础门户->BOP基础门户->BOP菜单->BOP根菜单->工 具 栏',
    rootName: 'BOP基础门户',
    updateUser: '管理员',
    updateTime: '2023-' + "@datetime('7-dd HH:7:ss')",
    'menuName|1': ['标准化子功能', '工作台子功能-测试11', '测试新闻管理', '测试结果', '岗位工作台', '叫号管理', '新闻管理', '分类管理', '短信发送', '彩信发送', '邮件发送', '历史查询', 'OP角色管理', '微件管理', 'OP角色门户管理']
  }))
}

module.exports = [
  // 资产数据列表接口
  {
    url: '/vue-element-admin/drainage-test/assetTableList',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: assetTableList,
        total: assetTableList.length
      }
    }
  },
  // 图渲染接口
  {
    url: '/vue-element-admin/drainage-test/graphData',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: graphData

      }
    }
  },
  {
    url: '/vue-element-admin/drainage-test/graph/detail',
    type: 'get',
    response: config => {
      debugger
      const { id, assetId } = config.query
      if (id == 1) {
        const detailData = {}
        const nodes = []
        // const edges = []
        // const index = tableData.findIndex(item => item.fieldName === fieldNameOldVal)
        // const nodes = graphData.nodes.filter(item => item.id == assetId)
        const edges = graphData.edges.filter(item => item.source == assetId || item.target == assetId)
        // for (let index = 0; index < edges.length; index++) {
        //   const edge = edges[index]
        // // const newEdge = graphData.edges.filter(item => item.source == edge.target)
        // // edges.push(...newEdge)
        // }
        detailData.nodes = nodes
        detailData.edges = edges
        return {
          code: 20000,
          data: graphData1
        }
      }
      if (id == 2) {
        return {
          code: 20000,
          data: graphData2
        }
      }
      if (id == 3) {
        return {
          code: 20000,
          data: graphData3
        }
      }
      if (id == 4) {
        return {
          code: 20000,
          data: graphData3
        }
      }
      if (id == 5) {
        return {
          code: 20000,
          data: graphData4
        }
      }
    }
  },
  // 树状结构图接口
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

