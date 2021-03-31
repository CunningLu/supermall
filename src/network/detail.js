import { request } from '@/network/request.js'

// 获取商品详细信息
export function getDetail(iid = 0) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

// 获取商品推荐列表信息
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

// 类：商品信息
export class Product {
  constructor(itemInfo = {}, columns = [], services = []) {
    this.topImages = itemInfo.topImages
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.newPrice
    this.oldPrice = itemInfo.oldPrice
    this.realPrice = itemInfo.lowNowPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
  }
}

// 类：商家信息
export class Shop {
  constructor(shopInfo = {}) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sales = shopInfo.cSells
    this.score = shopInfo.score
    this.quantity = shopInfo.cGoods
  }
}