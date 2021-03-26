<template>
<div style="display:flex; flex-wrap:wrap;">
<div v-for="(item, index) in popularList" :key="item"  style="width:20%;text-align:center;">
  <!-- <van-row v-if="index%2===0" justify="space-around" style="text-align:center;">
    <van-col v-for="(item, index) in popularList" :key="item" span="6">
      <a :href="item.link">
        <van-image width="50%" height="50" :src="item.image" fit="fill" />{{spliceArray(popularList)}}
        <div>{{item.title}}</div>
      </a>
    </van-col>
  </van-row> -->
  
    <van-image width="50" :src="item.image" fit="fill"/>
  
  
</div></div>
</template>

<script>
export default {
  props: {
    popularList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup() {
    function spliceArray(array, num) {
      if (array===[]) {return []}
      if(!num) {return []}

      const length = array.length
      console.log(Math.ceil(array))
      if(true) {
        Math.ceil(array)
      }
      const newArray = []
      return newArray
    }
    return {
      spliceArray
    }
  }
}
</script>

<style>

</style>