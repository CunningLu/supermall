<template>
  <van-nav-bar>
    <template #title>
      购物车 ({{ cartLength() }})
    </template>
  </van-nav-bar>
  <cart-list />
  <cart-submit-bar />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { mapGetters, useStore } from 'vuex'

import { Toast } from 'vant'

import CartList from './CartList'
import CartSubmitBar from './CartSubmitBar.vue'

export default {
  components: {
    CartList,
    CartSubmitBar
  },
  setup() {
    const store = useStore()
    const cartData = reactive({
      selectAll: false,
      totalPrice: 0,
    })

    const onSubmit = () => Toast('轻点了按钮')

    const onClickLink = () => Toast('修改地址')

    return {
      store,
      ...mapGetters(['cartLength']),
      ...toRefs(cartData),
      onSubmit,
      onClickLink,
    }
  }
}
</script>

<style scoped>
.van-card__thumb {
  display: flex;
}
</style>