<template>
  <van-swipe-cell>
    <template #default>
      <van-cell>
        <template #icon>
          <van-checkbox v-model="product.checked" />
        </template>
        <van-card :thumb="product.image" :title="product.title" :num="product.count" :price="product.price">
          <!-- <template #title>{{product.title}}</template> -->
          <template #desc></template>
          <!-- <template #num>{{product.count}}</template> -->
          <!-- <template #price>{{product.price}}</template> -->
          <!-- <template #thumb>
            <van-checkbox v-model="selectAll">全选</van-checkbox>
          </template> -->
          <template #footer></template>
        </van-card>
      </van-cell>
    </template>
    <template #right>
      <van-button square text="删除" type="danger" style="height: 100%;" @click="deleteProductClick(product.iid)" />
    </template>
  </van-swipe-cell>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props, context) {
    const deleteProductClick = (iid) => {
      context.emit('deleteProductClick', iid)
    }
    return {
      deleteProductClick
    }
  }
}
</script>

<style scoped>

</style>