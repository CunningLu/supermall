import { request } from '@/network/request.js'

// 获取首页综合数据
export function getMultiData() {
  return request({
    url: '/home/multidata'
  })
}

// 获取首页商品列表数据
export function getProductData(type = 'sell', page = 1) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}