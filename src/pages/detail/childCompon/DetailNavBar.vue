<template>
  <NavBar class="box" v-if="Object.keys(titles).length !== 0">
    <div slot="left" class="left" @click="backClick">
      <img src="@/assets/img/common/back.svg" alt="" />
    </div>
    <div slot="center" class="title">
      <div
        v-for="(item, index) in titles"
        :key="index"
        class="title-item"
        :class="{ active: currentIndex == index }"
        @click="tabClick(index)"
      >
        {{ item }}
      </div>
    </div>
  </NavBar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  props: ["titles"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    tabClick(index) {
      // 点击标题高亮，并发射事件通知主页面触发滚到特点位置事件
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  position: relative;
  z-index: 2;
  background-color: #fff;
  // 左边箭头的样式
  .left {
    img {
      margin-left: 10px;
      margin-top: 10px;
    }
  }

  // 中间文字部分的样式
  .title {
    display: flex;
    color: var(--color-text);
    font-size: var(--font-size);
    .title-item {
      flex: 1;
    }
    .active {
      color: var(--color-high-text);
    }
  }
}
</style>
