import request from '@/utils/request'

export function assetTableList() {
  return request({
    url: '/vue-element-admin/drainage-test/assetTableList',
    method: 'get'
  })
}
export function graphData() {
  return request({
    url: '/vue-element-admin/drainage-test/graphData',
    method: 'get'
  })
}
export function treeDataList() {
  return request({
    url: '/vue-element-admin/drainage-test/treeDataList',
    method: 'get'
  })
}
export function graphDetail(id, assetId) {
  return request({
    url: '/vue-element-admin/drainage-test/graph/detail',
    method: 'get',
    params: { id, assetId }
  })
}
