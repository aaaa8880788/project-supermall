<template>
  <div class="recommendPage" v-if="Object.keys(images).length !== 0">
    <!-- 这里在swiper里面v-if="banners.length"加上就loop就会生效， -->
    <!-- 原因如下 -->
    <!-- 

    loop
　　设置为true 则开启loop模式。
    loop模式：会在原本slide前后复制若干个slide (默认一个)并在合适的时候切换，让Swiper看起来是循环的。 
    loop模式在与free模式同用时会产生抖动，因为free模式下没有复制slide的时间点。

    注意：在原本基础上复制若干个slide，可是在vue的v-for中时，异步加载的数据都还没有返回时，就先加载了Swiper组件并复制了sliper

    解决方法：利用v-if的属性，v-if=showProduct.length，确保异步加载的数据已经返回后，再加载swiper组件




     -->
    <swiper :options="swiperOption" ref="mySwiper" v-if="images.length">
      <swiper-slide v-for="(item, index) in images" :key="index"
        ><img :src="item"
      /></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
// 轮播图部分的导入
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "Swiper",
  components: {
    swiper,
    swiperSlide,
  },
  props: ["images"],
  data() {
    return {
      // 轮播图部分
      swiperOption: {
        loop: true,

        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
        },
        observer: true,
        observeParents: true,
      },
      isLoad: false,
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  methods: {},
};
</script>

<style lang="css" scoped>
img {
  width: 100%;
  vertical-align: top;
}
.recommendPage .swiper-container {
  height: 300px;
  position: relative;
  width: 100%;
  background: pink;
}
.recommendPage .swiper-container .swiper-slide {
  width: 100%;
  background: yellowgreen;
  color: #000;
  font-size: 16px;
  text-align: center;
}
</style>