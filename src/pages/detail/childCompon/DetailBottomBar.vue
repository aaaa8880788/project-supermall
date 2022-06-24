<template>
  <div class="bottomBar">
    <div class="left">
      <span class="box1">
        <div>
          <span class="icon"></span>
        </div>
        <span>客服</span>
      </span>
      <span class="box2">
        <div>
          <span class="icon"></span>
        </div>
        <span>店铺</span>
      </span>
      <span class="cart" @click="toCart">
        <div>
          <img src="~@/assets/img/tabbar/shopcart.svg" />
          <i class="badge" v-if="cartBadge">{{ cartBadge }}</i>
        </div>
        <span>购物车</span>
      </span>
    </div>
    <div class="right">
      <div class="cart" @click="addCart">
        <span>加入购物车</span>
      </div>
      <div class="buy" @click="buyGoods">
        <span>购买</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DetailBottomBar",
  methods: {
    // 跳转购物车界面
    toCart() {
      // this.isCurrent = !this.isCurrent;
      this.$router.push("/shopcart");
    },
    // 将商品添加到购物车
    addCart() {
      this.$emit("addCart");
    },
    // 点击购买商品
    buyGoods() {
      this.$emit("buyGoods");
    },
  },
  computed: {
    ...mapGetters({ cartBadge: "totalNum" }),
  },
};
</script>

<style lang="less" scoped>
.bottomBar {
  display: flex;
  position: fixed;
  height: 49px;
  background-color: #fff;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  .left,
  .right {
    display: flex;
    flex: 1;
    text-align: center;
    span {
      display: block;
      flex: 1;
    }
  }
  .left {
    .cart {
      position: relative;
      div {
        width: 30px;
        height: 30px;
        padding-left: 11px;
        padding-top: 1px;
        img {
          width: 30px;
          height: 30px;
        }
        .badge {
          position: absolute;
          padding: 1px 3px;
          top: 2px;
          right: 2px;
          color: #fff;
          border-radius: 100%;
          background-color: red;
        }
      }
    }
    .box1 {
      div {
        width: 30px;
        height: 30px;
        margin: 0 auto;
        .icon {
          background-position: 1px -62px;
        }
      }
    }
    .box2 {
      div {
        width: 30px;
        height: 30px;
        margin: 0 auto;
        .icon {
          background-position: 2px -119px;
        }
      }
    }
    span.icon {
      width: 30px;
      height: 30px;
      display: inline-block;
      background: url("~@/assets/img/detail/detail_bottom.png") no-repeat;
      background-size: 90%;
    }
  }
  .right {
    span {
      font-size: 14px;
      line-height: 49px;
    }
    .cart {
      width: 50%;
      background-color: rgb(255, 221, 16);
    }
    .buy {
      width: 50%;
      background-color: rgb(123, 63, 74);
      color: #fff;
    }
  }
}
</style>