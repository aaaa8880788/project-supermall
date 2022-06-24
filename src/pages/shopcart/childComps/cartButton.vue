<template>
  <div class="wrapper">
    <div class="clickAll">
      <div class="btn">
        <checkBtn @click.native="isCheckAll" :ischecked="isSelAll" />
      </div>
      <span>全选</span>
    </div>
    <div class="totalPrice">
      <span>合计</span>
      <span class="small">￥{{ totalPrice }}</span>
    </div>
    <div class="buy" @click="goToBug">
      <span>结算({{ totalNum }})</span>
    </div>
  </div>
</template>

<script>
// 引入多选框按钮
import checkBtn from "@/components/content/checkbox/checkBtn";
import { mapGetters } from "vuex";

export default {
  name: "cartButton",
  components: {
    checkBtn,
  },
  methods: {
    isCheckAll() {
      if (this.cartList.length) {
        if (this.isSelAll) {
          this.$store.commit("NOCHECKALL");
        } else {
          this.$store.commit("CHECKALL");
        }
      }
    },
    goToBug() {
      this.$emit("goBuy");
    },
  },
  computed: {
    ...mapGetters(["cartList", "totalPrice", "isSelAll", "totalNum"]),
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  background-color: #fff;
  box-shadow: 0 -1px 5px 1px rgba(0, 0, 0, 0.186);
  height: 49px;
  display: flex;
  .clickAll {
    height: 100%;
    flex: 2;
    margin: 0 10px;
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
      font-size: 14px;
      color: rgb(111, 111, 111);
    }
  }
  .totalPrice {
    display: flex;
    flex: 3;
    align-items: center;
    margin-left: 20px;
    .small {
      color: var(--color-high-text);
    }
    span:not(.small) {
      font-size: 14px;
      color: rgb(111, 111, 111);
    }
  }
  .buy {
    display: flex;
    flex: 3;
    align-items: center;
    background-color: var(--color-tint);
    justify-content: center;
    color: #fff;
  }
}
</style>