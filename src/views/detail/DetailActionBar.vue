<template>
  <van-action-bar><toast message="111" :visible="vi" />
    <van-action-bar-icon icon="shop-o" text="店铺" color="var(--color-cl)" />
    <van-action-bar-icon icon="chat-o" text="客服" />
    <van-action-bar-icon icon="cart-o" text="购物车" :badge="cartLength()" to="/cart" />
    <van-action-bar-button type="warning" text="加入购物车" @click="addToCart" />
    <van-action-bar-button color="linear-gradient(to right, #F8BBD0, var(--color-cl))" type="danger" text="立即购买" />
  </van-action-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import { ref } from 'vue'
import Toast from '@/components/common/toast/Toast'
// import { Toast } from 'vant'

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    Toast
  },
  setup(props, context) {
    let vi = ref(false)
    // 方法：添加商品到购物车
    const addToCart = () => {
      // Toast.clear()
      // Toast.success('添加成功')
      context.emit('addToCart')
      vi.value=true
    }

    return {
      vi,
      ...mapGetters(['cartLength']),
      addToCart
    }
  }
}
</script>

<style lang='less' scoped>
.van-action-bar {
  z-index: 2;
}
</style>