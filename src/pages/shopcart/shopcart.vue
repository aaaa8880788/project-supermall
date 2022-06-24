<template>
  <div class="shopCart">
    <NavBar class="navBar">
      <div slot="center">购物车({{ cartLength }})</div>
    </NavBar>
    <div class="none" v-if="!cartLength">
      <span>啥也没有，去加入购物车吧</span>
      <img src="~@/assets/img/common/胡桃.gif" alt="" />
    </div>
    <Scroll class="scrollWrapper" ref="scroll">
      <!-- 商品列表 -->
      <cartList
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      />
    </Scroll>
    <cartButton class="btn-bar" @goBuy="goBuy" />
    <Toast v-if="isShowToast" :msg="msg" />
  </div>
</template>

<script>
// 导航栏引入
import NavBar from "@/components/common/navbar/NavBar";
// 子组件引入
import cartList from "./childComps/cartList";
import cartButton from "./childComps/cartButton";

// BS引入
import Scroll from "@/components/common/scroll/Scroll";

import { mapActions, mapGetters } from "vuex";

// 导入Toast
import { showToast } from "@/common/mixin";

export default {
  name: "shopcart",
  components: {
    NavBar,
    cartList,
    Scroll,
    cartButton,
  },
  mixins: [showToast],
  computed: {
    // ...mapGetters({ cartLength: "cartLength" })
    ...mapGetters(["cartLength", "cartList"]),
  },
  methods: {
    ...mapActions(["buy"]),
    goBuy() {
      // console.log("----");
      this.buy().then(
        (res) => {
          // 购买成功
          this.msg = res;
          this.toastMixin();
        },
        (err) => {
          // 购买失败
          this.msg = err;
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

<style lang="less" scoped>
.shopCart {
  position: relative;
  height: 100vh;
  .navBar {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 700;
  }
  .none {
    text-align: center;
    margin: 0 auto;
    color: rgb(221, 93, 7);
    margin-top: 50%;
    width: 80%;
    padding: 30px;
    color: #fff;
    background-color: var(--color-tint);
    border-radius: 30px;
    img {
      margin-top: 30px;
      border-radius: 20px;
    }
  }
  .scrollWrapper {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 98px;
    overflow: hidden;
  }
  .btn-bar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 49px;
  }
}
</style>
