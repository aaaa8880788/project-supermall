<template>
  <div class="wrapper">
    <NavBar class="navBar">
      <div slot="left" class="leftBox" @click="goBack">
        <img src="~@/assets/img/common/back.svg" />
      </div>
      <div slot="center">已购商品</div>
    </NavBar>
    <Scroll class="Scroll" ref="scroll">
      <goodsShow />
    </Scroll>
  </div>
</template>

<script>
// 导入导航栏部分
import NavBar from "@/components/common/navbar/NavBar";
// 导入商品展示部分
import goodsShow from "./childCompon/goodsShow";

import Scroll from "@/components/common/scroll/Scroll.vue";

export default {
  name: "MyGoods",
  components: {
    NavBar,
    goodsShow,
    Scroll,
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
  updated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  height: 100vh;
  background-color: #f4f4f4;
  overflow: hidden;
  .Scroll {
    height: calc(100% - 52px - 49px);
  }

  .navBar {
    position: relative;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 1px 5px 4px rgba(51, 51, 51, 0.118);
    .leftBox {
      position: relative;
    }
    div {
      color: rgb(51, 51, 51);
      height: 44px;
      img {
        display: block;
        top: 50%;
        transform: translateY(-50%);
        left: 15px;
        position: absolute;
      }
    }
  }
}
</style>