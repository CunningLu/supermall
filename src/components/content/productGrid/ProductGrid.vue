<template>
  <van-grid column-num="2" gutter="10">
    <van-grid-item v-for="product in productList" :key="product">
      <product-grid-item :product-item="product" />
    </van-grid-item>
  </van-grid>
</template>

<script>
import ProductGridItem from './ProductGridItem'
export default {
  components: {
    ProductGridItem
  },
  props: {
    productList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>