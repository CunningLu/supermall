<template>
  <van-swipe :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in bannerList" :key="item">
      <a :href="item.link">
        <van-image width="100%" height="100%" :src="item.image" />
      </a>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: {
    bannerList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>

</style>