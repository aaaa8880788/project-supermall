<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang="less" scoped>
.nav-bar {
  display: flex;
  // 在使用浏览器原生滚动时，为了让导航不跟随一起滚动
  // 后面用了better-scroll后设置了可滑动区域，这玩意就不需要了
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // z-index: 2;
  font-size: 16px;
  font-weight: 550;
  line-height: 44px;
  height: 44px;
  text-align: center;
  box-shadow: 0 1px 2px rgba(100, 100, 100, 0.1);
  .left,
  .right {
    width: 20%;
  }
  .center {
    flex: 1;
    text-align: center;
  }
}
</style>