import request from '@/utils/request'

export const demoFetch = (data: any) => request({
  url: '/demo',
  method: 'post',
  data
})
