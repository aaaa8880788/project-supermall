<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>

    <!-- 当滑动到一定位置的时候，这个栏目才出现，实现偷天换日效果 -->
    <tab-control
      v-show="tabControl.tabIsFixed"
      class="tab-control-top"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
    />

    <!-- 这里用ref是为了拿到scroll这个对象 -->
    <!-- 传入probeType=3为了滚动监听 -->
    <scroll
      class="scrollWrapper"
      ref="scroll"
      :probeType="3"
      @scrollps="scrollcontent"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图部分 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <!-- 推荐视口 -->
      <recommend-view :recommends="recommends" />
      <!-- 本周流行视口 -->
      <feature-view />
      <!-- 流行、新款、精选 视口 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 这里监听组件的点击需要用到native -->
    <BackTop @click.native="BackTopCilck" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 防抖函数的导入
import { debounce } from "@/common/utils";

// 公共组件导入
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/common/tabcontrol/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backtop/BackTop";

// 推荐视口的导入
import RecommendView from "@/pages/home/childComps/Recommend";

// 本周流行视口的导入
import FeatureView from "@/pages/home/childComps/FeatureView";

// 轮播图的导入
import HomeSwiper from "@/pages/home/childComps/HomeSwiper";

// 导入数据，网络请求
import { getHomeMultidata, getHomeGoods } from "@/network/home";

export default {
  name: "home",
  components: {
    NavBar,
    GoodsList,
    Scroll,
    BackTop,

    RecommendView,
    HomeSwiper,
    FeatureView,
    TabControl,
  },
  created() {
    // 获取首页轮播图相关信息
    this.getHomeMultidata();
    // 获取首页推荐
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  // updated() {
  //   // 解决划不动的BUG最终方案，在数据更新时调用一次refresh，这样就不用去监听图片啥的麻烦，直接一句话搞定，当然在BS里面用observeImage: true,更好
  //   this.$refs.scroll.refresh();
  // },
  mounted() {
    // 这里因为是隔两个互传事件用事件总线，，vuex用来数据共享
    // 这里要在mouted里面执行，因为如果在之前scroll还没出生呢
    // 解决滑动的BUG问题，本质就是图片刷新慢的时候，滑动高度已经更新了，造成滑动高度比更新后的图片高度小，所以划不动
    // 加上防抖函数debounce，这样就能解决不用每一张图片更新完都刷新一次滑动高度
    // const refresh = debounce(this.$refs.scroll.refresh, 100);
    // // 事件总线
    // this.$bus.$on("homeItemImgLoad", () => {
    //   refresh();
    // });
    // 如果这里不用防抖可以这样写
    // this.$bus.$on("homeItemImgLoad",()=>{
    //   this.$refs.scroll.refresh()
    // })
  },
  data() {
    return {
      // 轮播图图片数据存储
      banners: [],
      recommends: [],
      // 商品信息
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 点击获取类型
      currentType: "pop",
      // 回到顶部按钮是否显示
      isShowBackTop: false,

      // tabControl的相关信息存放
      tabControl: {
        tabOffsetTop: 0,
        tabIsFixed: false,
      },
      // 保存y值,这里用于home离开时的状态记录
      saveY: 0,
    };
  },
  methods: {
    // 监听tab-control传过来的数据
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }

      // 同步tabcontrol点击的type
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 点击触发回到顶部
    BackTopCilck() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 拖动位置监听
    scrollcontent(position) {
      // console.log(position);
      // 判断BackTop是否显示
      this.isShowBackTop = position.y < -1000;

      // 决定tabControl是否吸顶
      this.tabControl.tabIsFixed = -position.y >= this.tabControl.tabOffsetTop;
    },

    // 下拉更新加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
    },

    // 当轮播图加载完，拿到tabcontrol的offsetTop值
    swiperImageLoad() {
      this.tabControl.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求部分
    // 获取首页轮播图相关信息
    getHomeMultidata() {
      getHomeMultidata().then(({ data: { data } }) => {
        // console.log(res);
        this.banners = data.banner.list;
        this.recommends = data.recommend.list;
        // this.datas = res;
      });
    },
    // 获取首页推荐
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(({ data: { data } }) => {
        this.goods[type].list.push(...data.list);
        this.goods[type].page += 1;

        // 在数据加载完后，让下拉更新部分完成完成本次更新
        // this.$refs.scroll.finishPullUp();
        // 本来是要在这里加的，后来想了一下好像在loadMore里面加更好一点，你细细的品？
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  destroyed() {
    console.log("destroyed");
  },
  // Home离开时记录状态
  // 虽然在App那里加了KeepActive，但是better-scroll有Bug不一定管用
  activated() {
    // console.log("activated");
    // 先刷新，不然会有立刻返回顶部bug
    // 因为ScrollTo时间设置为零或者太短的话，先ScrollTo可能图片还没加载好，先refresh再ScrollTo可以保证图片已经加载好了
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // console.log("deactivated");
    this.saveY = this.$refs.scroll.getCurrentY();
  },
  updated() {
    this.$refs.scroll.refresh();
  },
};
</script>
<style lang="less" scoped>
.home {
  // padding-top: 44px;
  height: 100vh;
  // position: relative;
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }
  // 用了插件后就不起效果了这个，这个是给流行、新款、精选那个组件加的
  // .tab-control {
  //   position: sticky;
  //   top: 44px;
  // }
  // 这是给后来加上的最上面那个流行、新款、精选那个组件的样式

  .tab-control-top {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: #fff;
  }

  // 跳转可滑动区域
  .scrollWrapper {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  // .scrollWrapper {
  //   height: calc((100% - 93px));
  //   overflow: hidden;
  //   margin-top: 44px;
  // }
}
</style>