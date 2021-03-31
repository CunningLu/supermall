<template>
  <van-nav-bar fixed placeholder>
    <template #title>
      <van-search v-model="searchText" placeholder="搜索" />
    </template>
    <template #left>
      <van-icon name="vip-card-o" size="24" />
    </template>
    <template #right>
      <van-icon name="chat-o" size="24" />
      <!-- <van-popover v-model:show="showPopover" :actions="actions" placement="bottom-end">
        <template #reference>
          <van-icon name="plus" size="22" />
        </template>
      </van-popover> -->
    </template>
  </van-nav-bar>
  <van-notice-bar mode="closeable" left-icon="volume-o" text="本站尚未开放测试，相关功能与内容不可用。正在更新，请稍后再来。" color="white" background="var(--color-cl)" />

<van-pull-refresh v-model="loading" success-text="刷新成功" @refresh="onRefresh">

  <!-- <nav-bar></nav-bar> -->
  <!-- <van-search v-model="searchText" placeholder="搜索" /> -->
  <home-swipe :bannerList="multidata.banner.list" />
  <home-popular :popularList="multidata.recommend.list" />
  <!-- <van-sticky :offset-top="46"> -->
    <van-tabs v-model:active="activeName" sticky offset-top="46" swipeable :before-change="tabClick" @scroll="tabScroll">
      <!-- <van-tab title="标签 1">内容 1</van-tab> -->
      <van-tab title="推荐" name="sell"><product-grid :productList="productData.sell.list" /></van-tab>
      <van-tab title="热门" name="pop">
        <van-list v-model:loading="pullUp.loading" :finished="pullUp.finished" finished-text="已经拉到底啦" @load="pullUpLoad" offset="0">
          <product-grid :productList="productData.pop.list" />
        </van-list>
      </van-tab>
      <van-tab title="上新" name="new">
        <product-grid :productList="productData.new.list" />
      </van-tab>
    </van-tabs>
    
  <!-- </van-sticky> -->

</van-pull-refresh>

</template>

<script>
// import NavBar from '@/components/common/navBar/NavBar.vue'
import HomeSwipe from '@/views/home/HomeSwipe.vue'
import HomePopular from '@/views/home/HomePopular.vue'
import ProductGrid from '@/components/content/productGrid/ProductGrid.vue'

import { reactive, ref, onMounted, toRefs, onActivated, watch } from 'vue'
import { useRouter} from "vue-router"; 
import { getMultiData, getProductData } from '@/network/home.js'

export default {
  components: {
    // NavBar,
    HomeSwipe,
    HomePopular,
    ProductGrid
  },
  setup() {
    // 数据
    const router = useRouter()
    const homeData = reactive({
      scroll: {
        sell: 0,
        pop: 0,
        new: 0,
        temp: 0
      }
    })
    const showPopover = ref(false)
    const actions = [
      { text: '选项一', icon: 'add-o' },
      { text: '选项二', icon: 'music-o' },
      { text: '选项三', icon: 'more-o' },
    ]
    let loading = ref(false)
    const activeName = ref('sell')
    const pullUp = reactive({
      loading: false,
      finished: false
    })
    const searchText = ref('')
    const multidata = ref({
      banner: {
        list: []
      },
      recommend: {
        list: []
      }
    })
    const productData = ref({
      sell: {
        page: 0,
        list: []
      },
      pop: {
        page: 0,
        list: []
      },
      new: {
        page: 0,
        list: []
      }
    })

    // 方法
    const getHomeMultiData = async () => {
      const { data: result } = await getMultiData()
      multidata.value = result
    }

    const getHomeProductData = async (type = 'sell') => {
      const page = ++productData.value[type].page
      const { data: result } = await getProductData(type, page)
      // *直接解析数组并依次添加到原数组中
      productData.value[type].list.push(...result.list)
    }

    const onRefresh = () => {
      setTimeout(() => {
        // Toast('刷新成功');
        loading.value = false
      }, 1000)
    }

    const pullUpLoad = async () => {
      // setTimeout(() => {
        await getHomeProductData('pop')
        pullUp.loading = false
      // }, 1000)
    }

    const tabClick = (name, title) => {
      console.log(`系统的修改前滚动值: ${document.documentElement.scrollTop}`);
      homeData.scroll['temp'] = document.documentElement.scrollTop
      if (homeData.scroll[name] !== 0) document.documentElement.scrollTop = homeData.scroll[name]
      console.log(`${name}的当前滚动值: ${homeData.scroll[name]}`);
      console.log(`系统的修改后滚动值: ${document.documentElement.scrollTop}`);
      return true
    }

    const tabScroll = ({scrollTop, isFixed}) => {
      if (isFixed) homeData.scroll[activeName.value] = scrollTop
      console.log(`${scrollTop}+${isFixed}`);
    }

    watch(activeName, (newValue, old) => {
      // homeData.scroll[old] = homeData.scroll['temp']
      console.log(homeData.scroll);
    })

    // 生命周期
    // onMounted(getHomeMultiData)
    getHomeMultiData()
    getHomeProductData('sell')
    // getHomeProductData('pop')
    getHomeProductData('new')

    onActivated(() => {
      document.documentElement.scrollTop = homeData.scroll[activeName.value]
    })

    // const {data: result} = reactive(await getMutiData())
    
    // console.log(result)
    return {
      router,
      ...toRefs(homeData),
      showPopover,
      actions,
      loading,
      onRefresh,
      activeName,
      tabClick,
      tabScroll,
      pullUp,
      pullUpLoad,
      searchText,
      multidata,
      productData
    }
  },
  beforeRouteLeave(to, from, next) {
    this.scroll[this.activeName] = document.documentElement.scrollTop
    next()
  }
}
</script>

<style lang='less' scoped>
@import '~vant/lib/index.less';
@nav-bar-title-text-color: var(--color-cl);
@nav-bar-background-color: var(--color-cl);
@nav-bar-icon-color: var(--color-cl);

.van-search {
  width: 100%;
  // background-color: var(--color-cl);
  padding: 0 0;
}
</style>