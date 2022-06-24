<template>
  <div class="detail">
    <!-- 顶部导航部分 -->
    <DetailNavBar ref="nav" :titles="titles" @titleClick="titleClick" />
    <scroll
      class="scrollWrapper"
      ref="scroll"
      :probeType="3"
      @scrollps="getScrollPs"
    >
      <!-- 轮播图部分 -->
      <DetailSwiper :images="topImages" />
      <!-- 商品信息部分 -->
      <GoodsDetail :goodsInfo="goodsInfo" />
      <!-- 店铺信息部分 -->
      <ShopInfo :shopInfo="shopInfo" />
      <!-- 图片展示部分 -->
      <imgDetail :detailInfo="detailInfo" @imgLoad="imgLoad" />
      <!-- 商品参数部分 -->
      <ParamsDetail ref="params" :paramsInfo="paramsInfo" />
      <!-- 用户评论部分 -->
      <Comment ref="comment" :rate="rate" />
      <!-- 商品推荐部分 -->
      <GoodList ref="recommend" :goods="recommend" />
    </scroll>
    <!-- 底部导航栏 -->
    <DetailBottomBar @addCart="addCart" @buyGoods="buyGoods" />
    <!-- 返回顶部按钮，这里采用混入的方法 -->
    <BackTop @click.native="backTop" v-show="isShowTop" />
    <!-- Toast模块 -->
    <Toast :msg="msg" v-if="isShowToast" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

// 网络请求数据
import { getDetail, goodsInfo, shopInfo, paramsInfo } from "@/network/detail";
// 商品推荐数据，用首页的
import { getHomeGoods } from "@/network/home";

// 子组件导入

// 顶部导航栏
import DetailNavBar from "@/pages/detail/childCompon/DetailNavBar";

// 轮播图
import DetailSwiper from "@/pages/detail/childCompon/DetailSwiper";

// 商品信息
import GoodsDetail from "@/pages/detail/childCompon/GoodsDetail";

// 店铺信息
import ShopInfo from "@/pages/detail/childCompon/ShopInfo";

// 图片详情
import imgDetail from "@/pages/detail/childCompon/imgDetail";
// 商品参数
import ParamsDetail from "@/pages/detail/childCompon/ParamsDetail";
// 用户评论
import Comment from "@/pages/detail/childCompon/Comment";
// 商品推荐
import GoodList from "@/components/content/goods/GoodsList";
// 底部导航栏
import DetailBottomBar from "@/pages/detail/childCompon/DetailBottomBar";
// 混入方法导入返回顶部按钮和Toast弹窗
import { backTopMixIn, showToast } from "@/common/mixin";

// 引入scroll
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "detail",
  data() {
    return {
      // 传入iid
      iid: this.$route.params.iid,
      // 标题栏信息
      titles: ["商品", "参数", "评论", "推荐"],
      // 0.轮播图数据
      topImages: [],
      // 1.商品数据
      goodsInfo: {},
      // 2.店铺数据
      shopInfo: {},
      // 3.图片详情数据
      detailInfo: {},
      // 4.商品参数数据
      paramsInfo: {},
      // 5.用户评论数据
      rate: {},
      // 6.商品推荐数据
      recommend: [],
      // 7.标题栏对应滚动位置存储数据
      theamTop: [],
      // 8.滚动位置对应标题栏标题
      currentIndex: 0,
    };
  },
  // 监听路径中iid的变化，变化了就刷新页面，解决点击推荐的图片路径变了却跳转不了新页面问题
  watch: {
    // 在商品页面点击推荐商品后
    "$route.params.iid": {
      handler(newname, oldname) {
        // console.log("新值" + newname + "----" + "旧值" + oldname);
        this.$router.go(0);
        this.getDetail(newname);
      },
    },
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    GoodsDetail,
    ShopInfo,
    imgDetail,
    Scroll,
    ParamsDetail,
    Comment,
    GoodList,
    DetailBottomBar,
  },
  mixins: [backTopMixIn, showToast],
  created() {
    this.getDetail(this.iid);
    // 获取推荐商品数据
    // 取随机数("首页的数据")给推荐商品
    const typeArr = ["pop", "new"];
    const x = typeArr[Math.floor(Math.random() * 2)];
    const y = Math.ceil(Math.random(10) * 50);
    this.getHomeGoods(x, y);
  },
  // updated() {
  //   this.$refs.scroll.refresh();
  // },
  methods: {
    ...mapActions({ addCartList: "addCart", buysomething: "buysomething" }),
    getDetail(iid) {
      // 2.根据iid请求详情数据
      getDetail(iid).then(({ data: { result } }) => {
        // console.log(result);
        // 1.获取顶部轮播图片数据
        this.topImages = result.itemInfo.topImages;
        // console.log(this.topImages);
        // 2.获取商品信息
        this.goodsInfo = new goodsInfo(
          result.itemInfo,
          result.columns,
          result.shopInfo.services
        );
        // console.log(this.goodsInfo);
        // 3.获取店铺信息
        this.shopInfo = new shopInfo(result.shopInfo);
        // console.log(this.shopInfo);
        // 4.详情图片数据
        this.detailInfo = result.detailInfo;
        // 5.商品参数
        this.paramsInfo = new paramsInfo(
          result.itemParams.info,
          result.itemParams.rule
        );
        // 6.用户评论
        if (result.rate.cRate) {
          // 如果有评价，传递数据
          this.rate = result.rate;
        } else {
          // 如果没有评价，删掉评价标题
          this.titles = ["商品", "参数", "推荐"];
        }
      });
    },
    // 请求商品推荐数据(这里用的是首页的数据)
    getHomeGoods(type, page) {
      getHomeGoods(type, page).then(({ data: { data } }) => {
        this.recommend = data.list;
      });
    },
    // 商品推荐图片加载完后的监听，用来取高度数据
    imgLoad() {
      // 先刷新下视口高度
      this.$refs.scroll.refresh();
      // 点击标题所跳转的各个位置
      this.theamTop = [];
      // 第一个是商品
      this.theamTop.push(0);
      // 第二个是参数
      this.theamTop.push(-this.$refs.params.$el.offsetTop);
      // 第三个是评价
      // 如果没有评价就不添加坐标
      if (this.rate.cRate) {
        this.theamTop.push(-this.$refs.comment.$el.offsetTop);
      }
      // 第四个是推荐
      this.theamTop.push(-this.$refs.recommend.$el.offsetTop);
      // console.log(this.theamTop);
      // 传入最大值，方便之后滚动对应标题的条件判断
      this.theamTop.push(-Number.MAX_VALUE);
    },
    // 点击标题滚动
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, this.theamTop[index], 100);
      // console.log(this.theamTop);
    },
    // 获取滚动的距离，对应标题栏
    getScrollPs({ y }) {
      // 滑动标题自动切换
      const length = this.theamTop.length - 1;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          y <= this.theamTop[i] &&
          y >= this.theamTop[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 这里是滚动检测，混入返回顶部按钮
      this.showGoTop(y);
    },
    // 商品添加入购物车
    addCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.iid = this.goodsInfo.iid;
      product.img = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.price = this.goodsInfo.realPrice;
      product.desc = this.goodsInfo.desc;
      product.shopImg = this.shopInfo.logo;
      product.shopName = this.shopInfo.name;
      // 2.将商品添加到购物车里
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart',product)
      // this.$store.dispatch("addCart", product)

      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
      this.addCartList(product).then((res) => {
        // console.log(res);
        this.msg = res;
        this.toastMixin();
      });
    },
    // 点击购买触发
    buyGoods() {
      // console.log("----");
      // 获取已购商品需要展示的信息
      const product = {};
      product.iid = this.goodsInfo.iid;
      product.img = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.price = this.goodsInfo.realPrice;
      product.desc = this.goodsInfo.desc;
      product.shopImg = this.shopInfo.logo;
      product.shopName = this.shopInfo.name;
      product.count = 1;

      this.buysomething(product).then(
        (resolve) => {
          this.msg = resolve;
          this.toastMixin();
        },
        (reject) => {
          this.msg = reject;
          this.toastMixin();
        }
      );
    },
  },
  updated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style lang='less' scoped>
.detail {
  position: relative;
  font-size: var(--font-size);
  background-color: var(--color-background);
  height: 100vh;
  overflow: hidden;
  .scrollWrapper {
    position: absolute;
    z-index: 1;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
    background: var(--color-background);
  }
}
</style>