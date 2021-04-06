<template>
<!-- 回到顶部 -->
<transition name="van-fade">
  <van-icon v-show="backTopVisible" name="back-top" size="24" style="position: fixed;z-index: 1;bottom: 60px;right: 25px;" @click="backTopClick" />
</transition>

  <van-nav-bar fixed placeholder @click-left="clickLeft" @click-right="clickRight">
    <template #title>
      <van-tabs v-model:active="tabActiveName" color="var(--color-cl)" @change="tabChange">
        <van-tab v-for="tabItem in tabOptions" :key="tabItem" :title="tabItem.name" :name="tabItem.name">
          <!-- 内容 {{ index }} -->
        </van-tab>
      </van-tabs>
    </template>
    <template #left>
      <van-icon name="arrow-left" size="24" to="/" />
    </template>
    <template #right>
      <van-icon name="share-o" size="24" />
    </template>
  </van-nav-bar>
  <detail-swipe id="商品" :imageList="product.topImages" />
  <detail-product :product="product" />
  <detail-comments id="评价" :comments="comments" />
  <detail-shop :shop="shop" />
  <detail-params id="参数" :params="params" />
  <detail-details :details="details" />
  <van-cell id="推荐" icon="comment-o">
    <template #title>相似商品</template>
  </van-cell>
  <!-- <van-cell title="正在更新，请稍后再来" /> -->
  <product-grid :product-list="recommends" />
  <detail-action-bar @addToCart="addToCart" />
  <!-- 弹出：商品分享 -->
  <van-share-sheet v-model:show="shareVisible" title="分享到" :options="shareOptions" @select="shareSelect" />
</template>

<script>
import { ref, reactive, toRefs, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore, mapGetters } from 'vuex'

import { Toast } from 'vant'

import { getDetail, getRecommend, Product, Shop } from '@/network/detail.js'
import usebacktop from '@/common/useBackTop.js'

import DetailSwipe from './DetailSwipe'
import DetailProduct from './DetailProduct'
import DetailComments from './DetailComments'
import DetailShop from './DetailShop'
import DetailParams from './DetailParams.vue'
import DetailDetails from './DetailDetails'
import ProductGrid from '@/components/content/productGrid/ProductGrid.vue'
import DetailActionBar from './DetailActionBar'

export default {
  name: 'Detail',
  components: {
    DetailSwipe,
    DetailProduct,
    DetailComments,
    DetailShop,
    DetailParams,
    DetailDetails,
    ProductGrid,
    DetailActionBar
  },

  setup() {
    // 数据
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const iid = route.params.iid
    const activeName = ref('')
    const detailData = reactive({
      // 顶部标签栏选项
      tabActiveName: '商品',
      tabOptions: [
        { name: '商品', offsetTop: 0 },
        { name: '评价', offsetTop: 0 },
        { name: '参数', offsetTop: 0 },
        { name: '推荐', offsetTop: 0 },
      ],
      // 商品分享选项
      shareVisible: false,
      shareOptions: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: 'QQ', icon: 'qq' },
          { name: '微博', icon: 'weibo' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '生成海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '微信小程序码', icon: 'weapp-qrcode' },
        ],
      ],
      // 商品信息
      product: {},
      // 商品评价信息
      comments: {},
      // 店铺信息
      shop: {},
      // 商品参数信息
      params: { info: {}, rule: {} },
      // 商品详情信息
      details: {
        detailImage: [{}]
      },
      recommends: []
    })
    // const product = ref({
    //   // topImages: []
    // })
    // const shop = ref({})

    // 数据请求方法：商品详情信息
    const getDetailDetail = async () => {
      const { result: result } = await getDetail(iid)
      // 分别保存商品信息到不同对象中
      detailData.product = new Product(result.itemInfo, result.columns, result.shopInfo.services)
      detailData.comments = result.rate
      detailData.shop = new Shop(result.shopInfo)
      detailData.params = result.itemParams
      detailData.details = result.detailInfo
      console.log(result);
    }

    // 数据请求方法：商品推荐列表信息
    const getDetailRecommend = async () => {
      const { data: result } = await getRecommend()
      result.list.forEach(recommendItem => {
        recommendItem.iid = recommendItem.item_id
        recommendItem.sale = recommendItem.itemSale
        recommendItem.show = {}
        recommendItem.show.img = recommendItem.image
        // delete recommendItem[itemSale]
      })
      detailData.recommends = result.list
      console.log(result);
    }

    // 方法
    const clickLeft = () => {
      router.back()
    }

    const clickRight = () => {
      detailData.shareVisible = true
    }

    // 触发：手动轻点不同标签或者左右滑动标签，无法监听到代码方式改变v-model
    const tabChange = (name, title) => {
      const tabElement = document.querySelector(`#${name}`)
      if (tabElement) {
        document.documentElement.scrollTop = Math.max(0, tabElement.offsetTop - 46)
        // document.querySelector(`#${name}`).scrollIntoView({
        //   behavior: 'smooth',
        //   block: 'end'
        // })
      }
    }

    const shareSelect = (option) => {
      Toast.clear()
      const loading = Toast.loading({
        message: '正在加载',
        // overlay: true,
        forbidClick: true,
        duration: 0,
        // 处理分享失败：如果本实例未被覆盖，则在给定时间后返回失败结果
        onOpened() {
          setTimeout(() => {
            console.log(option)
            // Toast.fail(`分享到${option.name}失败\n正在更新，请稍后再来`)
            Toast.fail(`正在更新，请稍后再来`)
          }, 1000)
        }
      })
      
      if (option.icon === 'link') {
        Toast.success('复制成功')
      }

      detailData.shareVisible = false
    }

    // 私有方法：获取各部分内容的距离顶部高度，用于tab导航到对应位置
    const _getOffsetTop = () => {
      // forEach用于修改原数组 参数：当前项，当前项的索引，原数组
      detailData.tabOptions.forEach(tabItem => {
        const tabElement = document.querySelector(`#${tabItem.name}`)
        if (tabElement) {
          tabItem.offsetTop = Math.max(tabItem.offsetTop, tabElement.offsetTop - 46)
        }
        console.log(tabItem);
      })
      console.log(detailData.tabOptions);
    }

    // 公共功能：回到顶部
    const { backTopVisible, backTopControl, backTop } = usebacktop()

    const backTopClick = () =>{
      backTop()
    }

    const detailScroll = (event) => {
      const currentScroll = Math.ceil(document.documentElement.scrollTop)

      if (currentScroll >= document.querySelector(`#推荐`).offsetTop - 46) {
        detailData.tabActiveName = '推荐'
      } else if (currentScroll >= document.querySelector(`#参数`).offsetTop - 46) {
        detailData.tabActiveName = '参数'
      } else if (currentScroll >= document.querySelector(`#评价`).offsetTop - 46) {
        detailData.tabActiveName = '评价'
      } else {
        detailData.tabActiveName = '商品'
      }
      console.log(currentScroll);
      backTopControl()
    }

    // 底部动作栏
    const addToCart = async () => {
      const product = {}
      product.iid = iid
      product.title = detailData.product.title
      product.image = detailData.product.topImages[0]
      product.price = detailData.product.realPrice
      const result = await store.dispatch('addToCart', product)
      Toast.clear()
      Toast.success(result)
      // Toast.success('添加成功')
    }

    // 生命周期
    getDetailDetail()
    getDetailRecommend()
    onMounted(() => {
      window.addEventListener('scroll', detailScroll)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', detailScroll)
    })

    return {
      iid,
      activeName,
      ...toRefs(detailData),
      clickLeft,
      clickRight,
      tabChange,
      shareSelect,
      addToCart,
      backTopVisible, backTopControl, backTop,
      backTopClick
    }
  }
}
</script>

<style lang='less' scoped>
@import '~vant/lib/index.less';
@nav-bar-icon-color: var(--color-cl);
</style>