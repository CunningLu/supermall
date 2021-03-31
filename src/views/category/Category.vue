<template>
  <van-sidebar v-model="activeIndex">
  <van-sidebar-item title="标签名称" />
  <van-sidebar-item title="标签名称" />
  <van-sidebar-item title="标签名称" />
</van-sidebar>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  // name: 'Category',
  setup() {
    const categoryData = reactive({
      activeIndex: 0
    })

    return {
      ...toRefs(categoryData)
    }
  }
}
</script>

<style>

</style>