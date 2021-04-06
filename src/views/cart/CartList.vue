<template>
  <cart-list-item v-for="product in cartList()" :key="product" :product="product" @deleteProductClick="deleteProductClick" />
</template>

<script>
import { mapState } from 'vuex'

import CartListItem from './CartListItem'

export default {
  components: {
    CartListItem
  },
  setup() {
    const deleteProductClick = (iid) => {
      console.log(iid);
    }
    return {
      ...mapState(['cartList']),
      deleteProductClick
    }
  }
}
</script>

<style scoped>

</style>