<template>
  <van-nav-bar>购物车</van-nav-bar>
  <van-swipe-cell>
    <van-card price="200">
      <template #thumb>
        <van-checkbox v-model="selectAll">全选</van-checkbox>
      </template>
    </van-card>
    <template #right>
      <van-button square text="删除" type="danger" style="height: 100%;" @click="onSubmit" />
    </template>
  </van-swipe-cell>
  <van-submit-bar :price="totalPrice" button-text="结算 (0)" @submit="onSubmit">
    <van-checkbox v-model="selectAll">全选</van-checkbox>
    <template #tip>
      你的收货地址不支持同城送, <span @click="onClickLink">修改地址</span>
    </template>
  </van-submit-bar>
</template>

<script>
import { Toast } from 'vant'
import { reactive, toRefs } from 'vue'

export default {
  setup() {
    const cartData = reactive({
      selectAll: false,
      totalPrice: 0,
    })
    const onSubmit = () => Toast('轻点了按钮')
    const onClickLink = () => Toast('修改地址')
    return {
      ...toRefs(cartData),
      onSubmit,
      onClickLink,
    }
  }
}
</script>

<style scoped>
.van-submit-bar {
  bottom: 50px;
}
.van-card__thumb {
  display: flex;
}
</style>