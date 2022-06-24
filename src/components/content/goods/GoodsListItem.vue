<template>
  <div class="goodsItem" @click="goDetail(showIid)">
    <!-- 这里用图片懒加载提高性能，:src替换成v-lazy，要下插件的 -->
    <img v-lazy="showImg" :key="showImg" />
    <div class="goodsBox">
      <p class="title">{{ goodsItem.title }}</p>
      <div class="content">
        <span class="price">￥{{ goodsItem.price }}</span>
        <span class="sale">
          <span class="small">已售</span>
          {{ goodsItem.sale }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { goDetail } from "@/common/mixin";
export default {
  name: "GoodsListItem",
  props: ["goodsItem"],
  mixins: [goDetail],
  methods: {
    // 解决图片刷新，来不及更新滑动高度bug,滑不动的BUG
    // 方法就是加载完一次调用一次刷新，用到防抖
    // imgLoad() {
    //   if (this.$route.path.includes("/home")) {
    //     this.$bus.$emit("homeItemImgLoad");
    //   } else if (this.$route.path.includes("/detail")) {
    //     this.$bus.$emit("detaliImgLoad");
    //   }
    // },
  },
  computed: {
    showIid() {
      return this.goodsItem.iid;
    },
    showImg() {
      return this.goodsItem.img || this.goodsItem.show.img;
    },
    showSale() {
      return this.goodsItem.sale;
    },
  },
};
</script>

<style lang="less" scoped>
.goodsItem {
  width: 45%;
  margin: 10px 0;
  text-align: center;
  img {
    width: 100%;
    border-radius: 10px;
  }
  .goodsBox {
    color: var(--color-text);
    font-size: var(--font-size);
    .title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 5px 0;
    }
    .content {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>