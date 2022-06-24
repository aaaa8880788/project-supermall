<template>
  <div class="BackTop">
    <img src="@/assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang='less' scoped>
.BackTop {
  position: fixed;
  z-index: 999;
  bottom: 55px;
  right: 10px;
  img {
    width: 43px;
  }
}
</style>
