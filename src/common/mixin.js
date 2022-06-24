// 公共代码
import BackTop from "@/components/content/backtop/BackTop";
import Toast from "@/components/common/toast/Toast";

export const backTopMixIn = {
  components: {
    BackTop,
  },
  data() {
    return {
      // 是否显示返回顶部
      isShowTop: false,
    };
  },
  methods: {
    // 返回顶部
    backTop() {
      // 调用scroll里封装的方法
      this.$refs.scroll.scrollTo(0, 0);
    },
    showGoTop(y) {
      // 当滑动到一定位置出现返回顶部

      this.isShowTop = y < -1000 ? true : false;
    },
  },
};
export const goDetail = {
  methods: {
    // 点击商品跳转详情页
    goDetail(iid) {
      // this.$router.push("/detail/" + iid);
      this.$router.push({
        name: "Detail",
        params: {
          iid,
        },
      });
    },
  },
};
export const showToast = {
  components: {
    Toast,
  },
  data() {
    return {
      // 模态框消息
      msg: "",
      // 是否显示模态框
      isShowToast: false,
    };
  },
  methods: {
    toastMixin(timer = 2000) {
      this.isShowToast = true;
      setTimeout(() => {
        this.isShowToast = false;
      }, timer);
    },
  },
};
