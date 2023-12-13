import request from '@/utils/request'

export function assetDataList() {
  return request({
    url: '/vue-element-admin/drainage-test/assetDataList',
    method: 'get'
  })
}
export function treeDataList() {
  return request({
    url: '/vue-element-admin/drainage-test/treeDataList',
    method: 'get'
  })
}
