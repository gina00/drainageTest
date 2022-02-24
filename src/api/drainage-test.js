import request from '@/utils/request'

export function flowExtractTaskList() {
  return request({
    url: '/vue-element-admin/drainage-test/flowExtractTaskList',
    method: 'get'
  })
}

export function flowExtractLogList(query) {
  return request({
    url: '/vue-element-admin/drainage-test/flowExtractLogList',
    method: 'get',
    params: { query }
  })
}
export function cleanUpTab2List(query) {
  return request({
    url: '/vue-element-admin/drainage-test/cleanUpTab2List',
    method: 'get',
    params: { query }
  })
}
