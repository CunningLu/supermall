<template>
  <!-- 产品参数 -->
  <van-cell-group>
    <van-cell :title="params.info.key" icon="orders-o" />
    <!-- <van-cell v-for="param in params.info.set" :key="param" center :title="param.key">{{param.value}}</van-cell> -->
    <van-field v-for="param in params.info.set" :key="param" :label="param.key" :model-value="param.value" readonly />
  </van-cell-group>
  <!-- 尺码说明 -->
  <!-- <van-cell-group :title="params.rule.key">
    <van-cell v-for="param in params.info.set" :key="param" center :title="param.key">{{param.value}}</van-cell>
    <van-field v-for="param in params.rule.tables[0]" :key="param" :label="param.key" :model-value="param" readonly />
  </van-cell-group> -->
</template>

<script>
export default {
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>