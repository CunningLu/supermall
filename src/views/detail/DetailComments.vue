<template>

<van-cell-group>
  <van-cell icon="comment-o" :border="false" is-link @click="commentsClick">
    <!-- <template #icon><van-icon name="comment-o" size="24" /></template> -->
    <template #title>评价 ({{ comments.cRate || 0 }})</template>
    <template #default>查看全部</template>
  </van-cell>
  <van-cell v-if="comments.list" size="">
    <template #default>
      <div>
        <van-image :src="comments.list[0].user.avatar" fit="cover" width="10%" height="10%" round />
        {{ comments.list[0].user.uname }}
        {{ comments.list[0].created }}
        {{ comments.list[0].style }}
      </div>
      <div class="van-multi-ellipsis--l2">{{ comments.list[0].content }}</div>
      <van-grid v-if="comments.list[0].images" :column-num="Math.min(comments.list[0].images.length, 4)" :gutter="3" :border="false" square>
        <van-grid-item v-for="image in comments.list[0].images" :key="image">
          <van-image :src="image" fit="cover" height="100%" />
        </van-grid-item>
      </van-grid>
      <span v-for="extra in comments.list[0].extraInfo" :key="extra">{{ ' ' + extra + ' ' }}</span>
    </template>
  </van-cell>
</van-cell-group>

</template>

<script>
import { Toast } from 'vant'

export default {
  props: {
    comments: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup() {
    // 方法
    const commentsClick = () => {
      Toast.clear()
      Toast.fail(`正在更新，请稍后再来`)
    }

    return {
      commentsClick
    }
  }
}
</script>

<style scoped>

</style>