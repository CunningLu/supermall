<template>
  <van-image :src="productItem.show.img" fit="cover" width="100%" />
  <div>
    <p class="van-ellipsis1">{{ productItem.title }}</p>
    <span style="color: var(--color-cl);font-size: 18px;">￥{{ productItem.price }}</span> 已售{{ productItem.sale }}
  </div>
</template>

<script>
export default {
  props: {
    productItem: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.van-ellipsis1 {
  overflow: hidden;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  /* width: 100px; */
}
</style>