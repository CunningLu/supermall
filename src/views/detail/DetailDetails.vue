<template>
  <van-cell-group>
    <van-cell title="商品介绍" icon="label-o" />
    <van-cell center>{{ details.desc }}</van-cell>
    <!-- <van-field label="描述" :model-value="details.desc" readonly /> -->
  </van-cell-group>
  
  <!-- {{details.detailImage}} -->
  <van-image v-for="image in details.detailImage[0].list" :key="image" :src="image" @click="imageClick(image)" />
</template>

<script>
import { ImagePreview } from 'vant'

export default {
  props: {
    details: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup() {
    // 方法
    const imageClick = (image) => {
      // 轻点图片进入大图预览
      ImagePreview({
        images: [image],
        closeable: true,
        closeIcon: 'cross',
      })
    }

    return {
      imageClick
    }
  }
}
</script>

<style scoped>

</style>