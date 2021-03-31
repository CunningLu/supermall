<template>
  <van-row v-for="itemList in popularListC" :key="itemList" justify="space-around" style="text-align:center;">
    <van-col v-for="item in itemList" :key="item" span="6" @click="colClick(item)">
      <!-- <a :href="item.link"> -->
        <van-image width="50%" :src="item.image" fit="fill" />
        <div>{{ item.title }}</div>
      <!-- </a> -->
    </van-col>
  </van-row>
</template>

<script>
import { ref, computed } from 'vue'
import { Dialog } from 'vant'

export default {
  props: {
    popularList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props, context) {
    // 数据
    const popularListC = computed(() => spliceArray(props.popularList, 4))

    // 方法
    const spliceArray = (array, num) => {
      if (array === []) {return []}
      if (!num) {return []}

      const length = array.length
      const times = Math.ceil(length / num)
      const newArray = []
      for (let i = 0; i < times; i++) {
        // for (let j = 0; j < num && i*num+j < length; j++) {
        //   console.log(i*num);
        //   newArray[i][j] = array[i*num+j]
        // }
        // console.log(array.slice(i*num, num));
        newArray.push(array.splice(0, num))
      }

      return newArray
    }

    const colClick = async (item) => {
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
      popularListC,
      colClick
    }
  }
}
</script>

<style>

</style>