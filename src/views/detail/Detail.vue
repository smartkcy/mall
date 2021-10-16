<template>
  <div id="detail" name="Detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <Scroll class="content" :pull-up-load="true" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :goods-info="goodsInfo"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <good-list ref="recommends" :goods="recommends"/>
    </Scroll>
    <detail-bottom-bar v-on:addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

    <!--    <toast :message="message" :show="show" />-->
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "../../../../HYMall-master/src/views/detail/childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodList from "@/components/content/goods/GoodList";
import BackTop from "@/components/content/backTop/BackTop";

import {getDeatail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
import {BACKTOP_DISTANCE} from "common/const"
import {backTopMixin} from "@/common/mixin";
import {mapActions} from "vuex"

// import Toast from "@/components/common/toast/Toast";


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodList,
    BackTop,
    // Toast
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      goodsInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message:'',
      // show:false
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //  2.更具iid请求数据
    getDeatail(this.iid).then(res => {
      const data = res.result
      //  1.获取顶部图片数据
      this.topImages = data.itemInfo.topImages

      //  2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      console.log(this.goods);

      //  3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      //  4.保存商品的详情数据
      this.goodsInfo = data.detailInfo;

      //  5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //  6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]

        this.$nextTick(() => {
          //根据最新的数据，对应的DOM渲染出来
          //但是图片还没有加载完
          setTimeout(() => {
            this._getOffsetTops()
          }, 1000)
        })
      }
    })
    //  3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

  },
  mounted() {
  },
  methods: {
    ...mapActions(['addCart']),
    _getOffsetTops() {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 2000)
    },
    contentScroll(position) {
      //  1.获取y值
      const posttionY = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < length; i++) {

        // if (posttionY > this.themeTopYs[i] && posttionY<this.this.themeTopYs[i+1]){
        //
        // }
        if (this.currentIndex != i && ((i < length - 1 && posttionY >= this.themeTopYs[i] && posttionY < this.themeTopYs[i + 1]))) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }

        // 是否显示回到顶部
        this.isShowBackTop = -position.y > BACKTOP_DISTANCE
      }
    },
    addToCart() {
      // 1.获取购物车需要展示信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goodsInfo.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      //  2.将商品加入购物车
      // this.$store.cartList.push()
      // this.$store.dispatch("addCart",product).then(res => {
      //   console.log(res);
      // })
      //  采用映射的方法
      this.addCart(product).then(res => {
        // this.show = true
        // this.message = res
        //
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // },1500)
        this.$toast.toastShow(res, 1000)
      })


    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  margin-bottom: -8px;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
}
</style>
