<template>
  <van-submit-bar :price="cartTotal() * 100" :button-text="`结算 (${cartChecked().length})`" @submit="submitOrderClick">
    <van-checkbox v-model="selectAll" @click="selectAllClick(selectAll)">全选</van-checkbox>
    <template #tip>
      你的收货地址不支持同城送, <span @click="onClickLink">修改地址</span>
    </template>
  </van-submit-bar>
</template>

<script>
import { computed, ref, toRefs } from 'vue'
import { mapGetters, useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const { cartList } = toRefs(store.state)
    const { cartLength, cartChecked } = toRefs(store.getters)
    console.log((store.getters));

    const selectAll = computed(() => cartLength.value && cartLength.value === cartChecked.value.length)

    const selectAllClick = (flag) => {
      cartList.value.forEach(item => item.checked = !flag)
    }

    const submitOrderClick = () => {
      // console.log(selectAll.value);
      console.log(cartLength);
    }
    return {
      selectAll,
      ...mapGetters([ 'cartLength', 'cartTotal', 'cartChecked' ]),
      selectAllClick,
      submitOrderClick
    }
  }
}
</script>

<style>
.van-submit-bar {
  bottom: 50px;
}

</style>