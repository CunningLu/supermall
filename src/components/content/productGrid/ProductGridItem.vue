<template>
  <van-image width="100%" :src="productItem.show.img" fit="fill" />
  <div>
    <p class="van-ellipsis1">{{productItem.title}}</p>
    {{productItem.price}} 已售{{productItem.sale}}
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