<template>
  <div class="queryDetail" v-if="Object.keys(detailInfo).length !== 0">
    <div class="desc">
      <p>“{{ detailInfo.desc }}”</p>
    </div>
    <div>
      <div v-for="(item, index) in detailInfo.detailImage[0].list" :key="index">
        <img :src="item" @load="imgLoad" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "imgDetail",
  props: ["detailInfo"],
  data() {
    return {
      currentLoad: 0,
    };
  },
  methods: {
    imgLoad() {
      if (++this.currentLoad == this.detailInfo.detailImage[0].list.length) {
        this.$emit("imgLoad");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.queryDetail {
  padding: 10px;
  border-bottom: 5px solid #ccc;
  .desc {
    margin-bottom: 20px;
  }
  img {
    width: 100%;
  }
}
</style>