<template>
  <van-tabbar v-model="activeIndex" active-color="var(--color-cl)" placeholder route>
    <!-- <van-tabbar-item icon="home-o">首页</van-tabbar-item> -->
    <van-tabbar-item to="/" replace>
      <span>首页</span>
      <template #icon="icon">
        <van-icon :name="icon.active?'wap-home':'wap-home-o'" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/category" replace>
      <span>分类</span>
      <template #icon="icon">
        <van-icon :name="icon.active?'apps-o':'apps-o'" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/cart" replace>
      <span>购物车</span>
      <template #icon="icon">
        <van-icon :name="icon.active?'cart':'cart-o'" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/user" replace>
      <span>个人中心</span>
      <template #icon="icon">
        <van-icon :name="icon.active?'manager':'user-o'" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const activeIndex = ref(0)
    
    return {
      activeIndex
    }
  }
}
</script>

<style scoped>

</style>