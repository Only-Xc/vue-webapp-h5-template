import request from '@/utils/request'

export const demoFetch = (data) => request({
  url: '/demo',
  method: 'post',
  data
})
