<template>
  <div class="check-btn" :class="{ active: ischecked }">
    <img src="~@/assets/img/cart/tick.svg" />
  </div>
</template>

<script>
export default {
  name: "checkBtn",
  props: ["ischecked"],
};
</script>

<style lang="less" scoped>
.check-btn {
  border: 1px solid #ccc;
  overflow: hidden;
  border-radius: 100%;

  img {
    padding: 3px;
    vertical-align: middle;
  }
}
.active {
  background-color: rgb(243, 34, 139);
}
</style>