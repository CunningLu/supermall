<template>
  <van-swipe :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in bannerList" :key="item" @click="swipeClick(item)">
      <van-image :src="item.image" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { Dialog } from 'vant'

export default {
  props: {
    bannerList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup() {
    const swipeClick = async (item) => {
      // 弹窗提示是否要前往外部网址
      const result = await Dialog.confirm({
        title: '',
        message: `即将前往外部网站，请确认是否要继续\n${item.link}`,
        confirmButtonText: '前往',
        confirmButtonColor: 'var(--color-cl)'
      }).catch(err => err)
      // 处理弹窗结果
      if (result === 'confirm') {
        window.location.href = item.link
      } else if (result === 'cancel') {
        console.log('轻点了取消按钮')
      }
    }

    return {
      swipeClick
    }
  }
}
</script>

<style>

</style>