<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 引入better-scroll插件
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 接受BScroll对象
      scroll: null,
    };
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 开启div点击
      // 如果不开启，scroll包含的部分DIV点击无效，不过button按钮还是点击有效
      click: true,

      // 开启刷新
      // 一般情况下，我们请求图片数据还没有到达，可滚动尺寸却被确定了，此时可滚动尺寸小于实际的高度，需要刷新可滚动尺寸，就需要用到该插件。（有防抖功能）
      // 如果不加这个，你会发现你第一次进入的时候拖不动，切换一次PC移动转化又可以了，因为缓存了
      // 如果加了这个，就不用图片加载完就调refresh方法了
      observeImage: true,

      // 开启对 content 以及 content 子元素 DOM 改变的探测。当插件被使用后，当这些 DOM 元素发生变化时，将会触发 scroll 的 refresh 方法。 observe-dom 插件具有以下几个特性：

      observeDOM: true, // 开启 observe-dom 插件

      //开启滑动监听
      // 0,1不监测滑动的位置
      // 2 检测手指滑动时的位置
      // 3 监视滑动位置，包括手指离开的惯性滑动
      probeType: this.probeType,

      // 开启下拉更新
      pullUpLoad: this.pullUpLoad,
    });

    // 2.监听滚动的位置，要开启滑动监听才有效
    // 01-正常版，不排除出现bug
    // this.scroll.on("scroll", (position) => {
    //   this.$emit("scrollps", position);
    // });
    // 02-严谨版
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scrollps", position);
      });
    }

    // 3.监听下拉更新，要开启下拉更新才有效
    // 01-正常版，不排除出现bug
    // this.scroll.on('pullingUp',()=>{
    //   this.$emit('pullingUp');
    // })
    // 02-严谨版
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log("加载更多");
        this.$emit("pullingUp");
      });
    }
    // 虽然加了这个,但是你要是手快点滑动你就会发现BUG，直接就出来了，那是因为图片还没加载出来呢，高度几乎没有，而且你会发现只能触发一次，因为你触发了你没让他结束啊，所有要调用接受函数，一共两个BUG
  },

  methods: {
    // 监测滚轮的某个位置，返回该位置，配合返回顶部按钮的是否出现
    scrollTo(x, y, time = 500) {
      // 如果能拿到scroll对象，就执行该方法
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 下拉更新完成调用方法，不调用的话下拉更新只能用一次
    // 解决下拉更新只有一次的BUG
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },

    // 重新进行高度的计算，可拖动区域的高度
    // 用来解决不能滑动的BUG，因为图片还没加载完你滑动区域的高度已经确定了，这时候就造成了你滑不动，所以你要重新更新一下滑动的区域，把更新完图片的那片区域给算上
    refresh() {
      // console.log("-----");
      this.scroll && this.scroll.refresh();
    },

    // 获取当前的Y值
    getCurrentY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style>
</style>