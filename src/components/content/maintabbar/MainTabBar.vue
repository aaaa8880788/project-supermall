<template>
  <TabBar>
    <TabBaritem path="/home">
      <img slot="item-icon" src="@/assets/img/tabbar/home.svg" alt="" />
      <img
        slot="item-icon-active"
        src="@/assets/img/tabbar/home_active.svg"
        alt=""
      />
      <div slot="item-text">主页</div>
    </TabBaritem>
    <TabBaritem path="/category">
      <img slot="item-icon" src="@/assets/img/tabbar/category.svg" alt="" />
      <img
        slot="item-icon-active"
        src="@/assets/img/tabbar/category_active.svg"
        alt=""
      />
      <div slot="item-text">分类</div>
    </TabBaritem>
    <TabBaritem path="/shopcart">
      <img slot="item-icon" src="@/assets/img/tabbar/shopcart.svg" alt="" />
      <img
        slot="item-icon-active"
        src="@/assets/img/tabbar/shopcart_active.svg"
        alt=""
      />
      <div slot="item-text">购物车</div>
    </TabBaritem>
    <TabBaritem path="/profile">
      <img slot="item-icon" src="@/assets/img/tabbar/profile.svg" alt="" />
      <img
        slot="item-icon-active"
        src="@/assets/img/tabbar/profile_active.svg"
        alt=""
      />
      <div slot="item-text">我的</div>
    </TabBaritem>
  </TabBar>
</template>

<script>
import TabBar from "@/components/common/tabbar/TabBar";
import TabBaritem from "@/components/common/tabbar/TabBaritem";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBaritem,
  },
};
</script>

<style lang="css">
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -1px 2px rgba(62, 62, 62, 0.1);
}
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: 3px;
}
</style>