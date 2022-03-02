const Mock = require('mockjs')

const treeList = []
const treeChildrenList = []
const monitorList = []
const bussinessTableData = []
const severTableData = []
const nodeList = []
const compareAndFunctionCodeList = []
const childNodeList = []
const analysisParmsOutList = []
const drainageSceneList = []

// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < 15; i++) {
  monitorList.push(Mock.mock({
    functionCode: '@id(100000000)',
    reqType: '@integer(1, 2)'
  }))
}
for (let i = 0; i < 6; i++) {
  treeChildrenList.push(Mock.mock({
    id: '@increment(10)',
    'label|1': [
      'product_area_def',
      'ng_product_channel_cfg',
      'ini_config',
      'connection_source_def',
      'dtl_schema_def',
      'base_query_route_rule',
      'user_product',
      'user_product_deatil',
      'user_product_common_para',
      'crm_bill_operation',
      'user_product_para',
      'user_services',
      'user_service_para',
      'user_bons_deal',
      'boss_sms_send_operation'
    ]
  }))
}

for (let i = 0; i < 10; i++) {
  treeList.push(Mock.mock({
    id: '@increment(1)',
    'label|1': ['CCS', 'PMS', 'NOTIFY', 'ORD', 'MANAFE', 'CCS1', 'PMS1', 'NOTIFY1', 'ORD1', 'MANAFE1'],
    children: treeChildrenList
  }))
}

for (let i = 0; i < 4; i++) {
  compareAndFunctionCodeList.push(Mock.mock({
    id: '@increment(10)',
    compareRuleCode: '@increment(10)',
    // 'city|591-600': 1,
    'functionCode|902055220-902055240': 1,
    // functionCode: 902055220 + i,
    // functionCode: '@increment(10)',
    rulesSpecVal: null
  }))
}
for (let i = 0; i < 4; i++) {
  childNodeList.push(Mock.mock({
    id: '@increment(10)',
    'paramName|1': ['request_seq', 'request_seq2', 'request_seq3', 'request_seq4'],
    'paramDesc|1': ['request_seq', 'request_seq2', 'request_seq3', 'request_seq4'],
    occurrenceSort: 1,
    paramPath: null,
    'disorder|1': '@boolean',
    'needChecked|1': '@boolean',
    'existed|1': '@boolean',
    messageType: '@integer(1, 2)',
    responseMessage: '<?xml version=\"1.0\" encoding=\"GBK\"?> \r\n<operation_in type=\"struct\">\r\n  <service_name type=\"string\">ac_query_invoice</service_name>\r\n  <sysfunc_id type=\"int\">91001001</sysfunc_id>\r\n  <request_type type=\"int\">2001</request_type>\r\n  <verify_code type=\"string\">789730661774598915448481</verify_code>\r\n  <operator_id type=\"string\">9999999</operator_id>\r\n  <request_time type=\"datetime\">20050101223344</request_time>\r\n  <request_seq type=\"long\">100000000000</request_seq>\r\n  <request_source type=\"int\">101213</request_source>\r\n  <request_target type=\"int\">101101</request_target>\r\n  <msg_version type=\"string\">0100</msg_version>\r\n  <cont_version type=\"string\">0100</cont_version>\r\n  <content type=\"string\"><![CDATA[<?xml version=\"1.0\" encoding=\"GBK\"?>\r\n        <request type=\"struct\">\r\n <home_city type=\"int\">$:1</home_city>\r\n    <start_month type=\"int\">$:2</start_month>\r\n            <end_month type=\"int\">$:3</end_month>\r\n            <msisdn type=\"string\">$:4</msisdn>\r\n        </request>]]></content>\r\n</operation_in>'
  }))
}
for (let i = 0; i < 50; i++) {
  nodeList.push(Mock.mock({
    id: '@increment',
    functionCode: 902055220 + i,
    compareAndFunctionCodeList: compareAndFunctionCodeList,
    updateTime: '@date()',
    children: childNodeList
  }))
}
// 引流测试比对规则列表
for (let i = 0; i < 50; i++) {
  bussinessTableData.push(Mock.mock({
    functionCode: 902055220 + i
  }))
}
for (let i = 0; i < 50; i++) {
  severTableData.push(Mock.mock({
    functionCode: 902055220 + i
  }))
}
for (let i = 0; i < 15; i++) {
  analysisParmsOutList.push(Mock.mock({
    id: '@increment(10)',
    'paramName|1': ['PubInfo', 'RegionCode', 'ClientIP', 'InterfaceType', 'InterfaceId', 'CountyCode', 'TransactionId', 'TransactionTime', 'OpId', 'OrgId', 'Request', 'BusiCode', 'BusiParams', 'phone_id'],
    'paramDesc|1': ['PubInfo', 'RegionCode', 'ClientIP', 'InterfaceType', 'InterfaceId', 'CountyCode', 'TransactionId', 'TransactionTime', 'OpId', 'OrgId', 'Request', 'BusiCode', 'BusiParams', 'phone_id'],
    occurrenceSort: 1,
    paramValue: 1,
    'disorder|1': '@boolean',
    'needChecked|1': '@boolean',
    'existed|1': '@boolean',
    'paramPath|1': ['/PubInfo', '/PubInfo/RegionCode', '/ClientIP', '/InterfaceType', '/InterfaceId', '/CountyCode', '/TransactionId', '/TransactionTime', '/OpId', '/OrgId', '/Request', '/BusiCode', '/BusiParams', '/phone_id'],
    responseMessage: '<?xml version=\"1.0\" encoding=\"GBK\"?> \r\n<operation_in type=\"struct\">\r\n  <service_name type=\"string\">ac_query_invoice</service_name>\r\n  <sysfunc_id type=\"int\">91001001</sysfunc_id>\r\n  <request_type type=\"int\">2001</request_type>\r\n  <verify_code type=\"string\">789730661774598915448481</verify_code>\r\n  <operator_id type=\"string\">9999999</operator_id>\r\n  <request_time type=\"datetime\">20050101223344</request_time>\r\n  <request_seq type=\"long\">100000000000</request_seq>\r\n  <request_source type=\"int\">101213</request_source>\r\n  <request_target type=\"int\">101101</request_target>\r\n  <msg_version type=\"string\">0100</msg_version>\r\n  <cont_version type=\"string\">0100</cont_version>\r\n  <content type=\"string\"><![CDATA[<?xml version=\"1.0\" encoding=\"GBK\"?>\r\n        <request type=\"struct\">\r\n <home_city type=\"int\">$:1</home_city>\r\n    <start_month type=\"int\">$:2</start_month>\r\n            <end_month type=\"int\">$:3</end_month>\r\n            <msisdn type=\"string\">$:4</msisdn>\r\n        </request>]]></content>\r\n</operation_in>'
  }))
}
for (let i = 0; i < 50; i++) {
  drainageSceneList.push(Mock.mock({
    sceneCode: 1000000 + i,
    sceneName: '测试场景' + i,
    sceneIntroduction: '测试场景' + i,
    updateTime: '@date()'
  }))
}
module.exports = [
  {
    url: '/vue-element-admin/drainage-test/pageQueryTree',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: treeList
      }
    }
  },
  {
    url: '/vue-element-admin/drainage-test/getMonitorData',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: monitorList
      }
    }
  },
  {
    url: '/vue-element-admin/drainage-test/bussinessTableData',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        total: bussinessTableData.length,
        data: bussinessTableData
      }
    }
  },
  {
    url: '/vue-element-admin/drainage-test/severTableData',
    type: 'post',
    response: config => {
      const { page = 1, limit = 10 } = config
      // severTableData.slice((page - 1) * limit, page * limit)
      const pageList = severTableData.slice((page - 1) * limit, page * limit)
      debugger
      return {
        code: 20000,
        total: severTableData.length,
        data: pageList
      }
    }
  },
  {
    url: '/vue-element-admin/drainage-test/getCompareRulesInfor',
    type: 'post',
    response: _ => {
      // severTableData.slice((page - 1) * limit, page * limit)
      // const pageList = severTableData.slice((page - 1) * limit, page * limit)
      // const pageList = data[config]

      return {
        code: 20000,
        data: nodeList
      }
    }
  },
  {
    url: '/vue-element-admin/drainage-test/analysisParmsOut',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: analysisParmsOutList
      }
    }
  },
  {
    url: '/vue-element-admin/drainage-test/drainageScene',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: drainageSceneList
      }
    }
  }

]

