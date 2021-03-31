<template>
  <van-cell-group>
    <!-- 价格 -->
    <van-cell center>
      <div class="goods-price">
        <span style="color: var(--color-cl);font-size: 24px;">￥{{ product.realPrice }}</span>
        <s style="margin-left: 5px;color: #aaa;">{{ product.oldPrice }}</s></div>
    </van-cell>
    <!-- 标题 -->
    <van-cell center>
      <template #title>
        <van-tag style="margin-right: 5px;" color="var(--color-cl)">{{ product.discount }}</van-tag>
        <span>{{ product.title }}</span>
      </template>
      <template #right-icon>
        <van-icon name="like-o" size="24" @click="collectClick" />
      </template>
    </van-cell>
    <!-- 服务 -->
    <van-cell is-link @click="servicesClick">
      <template #title>
        <!-- <span v-for="item in product.columns" :key="item" class="custom-title">{{ item }}</span>
        <van-tag v-for="item in product.columns" :key="item" type="danger">{{ item }}</van-tag> -->
        <span v-for="service in product.services" :key="service"><van-image width="10" :src="service.icon" style="margin-left: 5px;margin-right: 3px;" />{{ service.name }}</span>
      </template>
    </van-cell>
    <!-- <van-cell>
      <van-col v-for="item in product.columns" :key="item">{{ item }}</van-col>
    </van-cell> -->
    <!-- <van-cell class="goods-express">
      <van-col span="10">运费：{{ product.express }}</van-col>
      <van-col span="14">剩余：{{ product.remain }}</van-col>
    </van-cell> -->
  </van-cell-group>
  <!-- 弹出：服务说明 -->
  <van-action-sheet v-model:show="servicesVisible" title="服务说明">
    <div class="content">
      <van-cell v-for="service in product.services" :key="service">
        <template #title>
          <van-image width="14" :src="service.icon" style="margin-right: 5px;" />
          <span>{{ service.name }}</span>
        </template>
        <template #label>
          描述：{{ service.name }}
        </template>
      </van-cell>
    </div>
  </van-action-sheet>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { Toast } from 'vant'

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props) {
    // 数据
    const productData = reactive({
      servicesVisible: false
    })

    // 方法
    const servicesClick = () => {
      productData.servicesVisible = true
    }

    const collectClick = () => {
      Toast.clear()
      Toast.fail(`正在更新，请稍后再来`)
    }

    return {
      ...toRefs(productData),
      servicesClick,
      collectClick
    }
  }
}
</script>

<style scoped>
.content {
  height: 58vh;
}
</style>