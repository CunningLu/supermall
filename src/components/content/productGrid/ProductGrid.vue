<template>
  <van-grid column-num="2" gutter="5" :border="false">
    <van-grid-item v-for="product in productList" :key="product" :to="`/detail/${product.iid}`">
      <template #default>
        <product-grid-item :product-item="product" />
      </template>
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