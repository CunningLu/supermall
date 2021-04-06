import { ADD_PRODUCT, ADD_COUNT } from './mutation-types.js'

export default {
  // 将 context 对象的参数解构为 state 和 commit
  addToCart({ state, commit }, payload = {}) {
    // find 返回第一个匹配结果 undefined
    // filter 返回所有匹配结果的数组 []
    const product = state.cartList.find(item => item.iid === payload.iid)

    return new Promise((resolve, reject) => {
      if (product) {
        commit(ADD_COUNT, product)
        resolve('数量 +1')
      } else {
        commit(ADD_PRODUCT, payload)
        resolve('添加成功')
      }
    })

    if (product) {
      commit(ADD_COUNT, product)
    } else {
      commit(ADD_PRODUCT, payload)
    }
  }
}