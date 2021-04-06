export default {
  // 购物车商品列表长度
  cartLength (state) {
    return state.cartList.length
  },
  // 已选的购物车商品列表
  cartChecked (state) {
    return state.cartList.filter(item => item.checked)
  },
  // 已选的购物车商品总额
  cartTotal (state, getters) {
    return getters.cartChecked.reduce((total, item) => total + item.price * item.count, 0)
  }
}