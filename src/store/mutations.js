import { ADD_PRODUCT, ADD_COUNT } from './mutation-types.js'

export default {
  // 添加新的商品到购物车列表
  [ADD_PRODUCT] (state, payload) {
    payload.count = 1
    payload.checked = true
    state.cartList.push(payload)
  },
  // 为已在购物车中的商品数量 +1
  [ADD_COUNT] (state, payload) {
    payload.count ++
  }
}