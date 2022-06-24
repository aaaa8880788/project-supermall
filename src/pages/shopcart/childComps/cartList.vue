<template>
  <div class="wrapper">
    <checkBtn :ischecked="product.checked" @click.native="btnClick" />
    <div class="goodsImg" @click="goDetail(product.iid)">
      <img :src="product.img" />
    </div>
    <div class="goodsInfo" @click="goDetail(product.iid)">
      <p class="title">{{ product.title }}</p>
      <p class="desc">{{ product.desc }}</p>
      <div class="info_bottom">
        <span>￥{{ product.price }}</span>
        <span>X{{ product.count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// 引入多选框按钮
import checkBtn from "@/components/content/checkbox/checkBtn";
// 引入混入方法goDetail
import { goDetail } from "@/common/mixin";

export default {
  name: "cartList",
  props: ["product"],
  mixins: [goDetail],
  components: {
    checkBtn,
  },
  methods: {
    btnClick() {
      // 点击修改当前商品的选中状态
      this.$store.commit("CHECKED", this.product);
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid rgba(100, 100, 100, 0.2);
  .goodsImg {
    margin: 0 10px;
    img {
      width: 80px;
      height: 100px;
      border-radius: 5px;
    }
  }
  .goodsInfo {
    width: 65%;
    display: flex;
    flex-direction: column;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .desc {
      margin: 20px 0;
      font-size: 12px;
      color: rgb(160, 160, 160);
    }
    .info_bottom {
      display: flex;
      justify-content: space-between;
      span {
        line-height: 100%;
        font-size: 20px;
      }
      span:first-child {
        color: var(--color-tint);
      }
      span:last-child {
        color: rgb(157, 77, 3);
      }
    }
  }
}
</style>