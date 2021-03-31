<template>
  <van-swipe ref="swipeRef" indicator-color="white" @change="swipeChange">
    <van-swipe-item v-for="item in imageList" :key="item" @click="swipeClick">
      <van-image height="40vh" :src="item" fit="cover" />
    </van-swipe-item>
    <template #indicator>
      <div class="indicator">{{ activeIndex + 1 }}/{{ imageList.length }}</div>
    </template>
  </van-swipe>
</template>

<script>
import { reactive, toRefs } from 'vue'

import { ImagePreview } from 'vant'

export default {
  props: {
    imageList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props) {
    // 数据
    const swipeData = reactive({
      activeIndex: 0,
      swipeRef: null
    })

    // 方法
    const swipeChange = (index) => {
      swipeData.activeIndex = index
    }

    const swipeClick = () => {
      // 轻点图片进入大图预览
      ImagePreview({
        images: props.imageList,
        startPosition: swipeData.activeIndex,
        onClose(item) {
          swipeData.swipeRef.swipeTo(item.index, { immediate: true })
        },
        closeable: true,
        closeIcon: 'cross',
      })
    }

    return {
      ...toRefs(swipeData),
      swipeChange,
      swipeClick
    }
  }
}
</script>

<style scoped>
.indicator {
  position: absolute;
  right: 7px;
  bottom: 10px;
  padding: 2px 5px;
  font-size: 16px;
  background: rgba(0, 0, 0, 0.1);
}
</style>