<template>
  <div class="goodsList" v-if="myGoods.length">
    <div
      v-for="(item, index) in myGoods"
      :key="index"
      class="goodsItem"
      @click="goDetail(item.iid)"
    >
      <div class="top">
        <div>
          <img :src="item.shopImg" />
          <span>{{ item.shopName }}</span>
        </div>
        <div class="small">
          <span>待发货</span>
        </div>
      </div>
      <div class="bottom">
        <div class="imgBox">
          <img :src="item.img" />
        </div>
        <div class="titleBox">
          <p class="title">
            {{ item.title }}
          </p>
        </div>
        <div class="countBox">
          <p>
            <span
              >￥<span class="small">{{ item.price }}</span></span
            >
          </p>
          <p>
            <span
              >共<span class="small">{{ item.count }}</span
              >件</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goDetail } from "@/common/mixin";
import { mapState } from "vuex";

export default {
  name: "goodsShow",
  mixins: [goDetail],
  computed: {
    ...mapState(["myGoods"]),
  },
};
</script>

<style lang="less" scoped>
.goodsList {
  .goodsItem {
    padding: 10px;
    font-size: 14px;
    margin: 10px;
    background-color: #fff;
    border-radius: 10px;
    .top {
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          margin-right: 10px;
          vertical-align: middle;
        }
      }
    }
    .bottom {
      display: flex;
      margin-top: 10px;
      .imgBox {
        flex: 2;
        img {
          width: 60px;
          border-radius: 10px;
          -webkit-line-clamp: 2;
        }
      }
      .titleBox {
        flex: 7;
        padding: 10px;
        font-size: 12px;
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .countBox {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: center;
        p {
          span {
            font-size: 14px;
          }
          .small {
            color: red;
          }
        }
      }
    }
  }
}
</style>