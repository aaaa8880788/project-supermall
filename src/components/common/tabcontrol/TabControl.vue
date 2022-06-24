<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in titles"
      :key="index"
      :class="{ active: index === currentIndex }"
      @click="tabClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default: {
        return: [],
      },
    },
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style lang="less" scoped>
.tab-control {
  display: flex;
  font-size: 15px;
  line-height: 40px;
  text-align: center;
  background-color: #fff;
  .tab-control-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
    span {
      border-bottom: 3px solid var(--color-tint);
      padding: 5px;
    }
  }
}
</style>