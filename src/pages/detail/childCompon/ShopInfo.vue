<template>
  <div class="shopInfo" v-if="Object.keys(shopInfo).length !== 0">
    <!-- 第一部分 -->
    <div class="shopName">
      <img :src="shopInfo.logo" alt="" />
      <span>{{ shopInfo.name }}</span>
      <span class="small">
        粉丝数:
        <span>{{ shopInfo.cFans }} </span>
      </span>
    </div>
    <!-- 第二部分 -->
    <div class="infoBox">
      <!-- 左边部分 -->
      <div class="left">
        <span>
          <p>{{ totalSell }}</p>
          <p>总销量</p>
        </span>
        <span>
          <p>{{ shopInfo.cGoods }}</p>
          <p>全部宝贝</p>
        </span>
      </div>
      <!-- 右边部分 -->
      <div class="right">
        <p v-for="(item, index) in shopInfo.score" :key="index">
          <span>{{ item.name }}</span>
          <span class="point">{{ item.score }}</span>
          <span class="level" :class="{ betterLevel: item.isBetter }">{{
            item.isBetter ? "高" : "底"
          }}</span>
        </p>
      </div>
    </div>
    <!-- 底部部分 -->
    <div class="bottom">进店逛逛</div>
  </div>
</template>

<script>
export default {
  name: "ShopInfo",
  props: ["shopInfo"],
  computed: {
    // 销量的数据格式化
    totalSell() {
      const sell = this.shopInfo.cSells;
      const sellFormat =
        parseInt(sell / 10000) + "." + parseInt((sell % 10000) / 1000) + "万";

      return sell > 10000 ? sellFormat : sell;
    },
  },
};
</script>

<style lang="less" scoped>
.shopInfo {
  padding: 10px;
  border-top: 5px solid rgb(220, 220, 220);
  border-bottom: 5px solid rgb(220, 220, 220);
  .shopName {
    position: relative;
    img {
      width: 50px;
    }
    span {
      margin-left: 10px;
      font-size: 16px;
    }
    span.small {
      position: absolute;
      font-size: 13px;
      bottom: 0;
      right: 5%;
      span {
        color: var(--color-high-text);
      }
    }
  }
  .infoBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    float: wrap;
    margin: 10px 0;
    .left {
      font-size: 12px;
      display: flex;
      text-align: center;
      width: 50%;
      justify-content: center;
      line-height: 100%;
      span {
        P:first-child {
          font-size: 16px;
          padding-bottom: 10px;
          color: rgb(0, 0, 0);
        }
        margin-right: 20px;
      }
    }
    .right {
      position: relative;
      width: 50%;
      p {
        margin-bottom: 10px;
        .point {
          padding: 0 20px;
          color: rgb(7, 163, 7);
        }
        .level {
          position: absolute;
          right: 0;
          background-color: rgb(7, 163, 7);
        }
        .betterLevel {
          background-color: var(--color-tint) !important;
        }
      }
    }
  }
  .bottom {
    margin: 0 auto;
    text-align: center;
    // width: 40%;
    padding: 8px 40px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: rgb(242, 245, 252);
  }
}
</style>