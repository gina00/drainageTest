import request from '@/utils/request'

export function flowExtractTaskList(query) {
  return request({
    url: '/vue-element-admin/drainage-test/flowExtractTaskList',
    method: 'get',
    params: query
  })
}

export function xxxxx(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
