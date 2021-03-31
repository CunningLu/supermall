<template>
  <van-cell-group class="goods-cell-group">
    <van-cell center clickable @click="shopClick">
      <template #icon>
        <van-image style="margin-right: 10px;" :src="shop.logo" width="20%" height="20%" fit="cover" class="van-hairline--surround" />
      </template>
      <template #title>
        <span class="van-cell-text">{{ shop.name }}</span>
        <!-- <van-tag class="goods-tag" style="margin-left: 5px;" type="danger">官方</van-tag> -->
        <div>{{ shop.fans }} 人关注</div>
      </template>
      <template #label>
        <span class="van-cell-text">全部商品: {{ shop.quantity }}</span>
        <span class="van-cell-text" style="margin-left: 5px;">总售出: {{ shop.sales }}</span>
      </template>
      <template #default>
        <van-row v-for="score in shop.score" :key="score">
          {{ score.name }}
          {{ (score.score).toFixed(1) }}
          <van-tag v-if="score.isBetter" style="margin: 2px;margin-left: 5px;" color="var(--color-cl)" type="danger">高</van-tag>
          <van-tag v-else style="margin: 2px;margin-left: 5px;" type="success">低</van-tag>
        </van-row>
      </template>
    </van-cell>
    <!-- <van-cell title="线下门店" icon="location-o" is-link @click="shopClick" /> -->
    </van-cell-group>
</template>

<script>
import { Toast } from 'vant'

export default {
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup() {
    const shopClick = () => {
      Toast.clear()
      Toast.fail(`正在更新，请稍后再来`)
    }

    return {
      shopClick
    }
  }
}
</script>

<style scoped>

</style>