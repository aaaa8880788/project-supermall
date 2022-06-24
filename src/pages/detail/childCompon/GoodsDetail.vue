<template>
  <!-- 这里如果数据还没加载就不现实，防止报错，跟之前轮播图的v-if一个道理，因为轮播图那传的是数组，所以直接length，这里是对象所以要用这种方法 -->
  <div class="itemInfo" v-if="Object.keys(goodsInfo).length !== 0">
    <!-- 第一部分 -->
    <h3 class="title">{{ goodsInfo.title }}</h3>
    <!-- 第二部分 -->
    <section class="price">
      <span class="realPrice"> ￥{{ goodsInfo.realPrice }} </span>
      <span class="oldPrice">
        {{ goodsInfo.oldPrice }}
      </span>
      <span
        class="discount"
        :style="{ backgroundColor: goodsInfo.discountBgColor }"
      >
        {{ goodsInfo.discount }}
      </span>
    </section>
    <!-- 第三部分 -->
    <section class="otherInfo">
      <span>{{ goodsInfo.columns[0] }}</span>
      <span>{{ goodsInfo.columns[1] }}</span>
      <span>{{ goodsInfo.services[0].name }}</span>
    </section>
    <!-- 第四部分 -->
    <section class="server">
      <span v-for="index in goodsInfo.services.length - 1" :key="index">
        <img :src="goodsInfo.services[index].icon" alt="" />
        {{ goodsInfo.services[index].name }}
      </span>
    </section>
  </div>
</template>

<script>
export default {
  name: "GoodsDetail",
  props: ["goodsInfo"],
};
</script>

<style lang="less" scoped>
.itemInfo {
  padding: 10px;
  .price {
    position: relative;
    margin: 10px 0;
    .realPrice {
      font-size: 25px;
      color: var(--color-high-text);
      font-weight: 600;
    }
    .oldPrice {
      font-size: 10px;
      text-decoration: line-through;
    }
    .discount {
      position: absolute;
      top: 2px;
      margin: 0 3px;
      font-size: 10px;
      padding: 1px 2px;
      border-radius: 20px;
      color: #fff;
    }
  }
  .otherInfo {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    padding: 0 0 10px 0;
    border-bottom: 1px solid #ccc;
  }
  .server {
    display: flex;
    font-size: 13px;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 10px;
    img {
      width: 15px;
      vertical-align: middle;
    }
  }
}
</style>