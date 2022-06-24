const mutations = {
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每个方法尽可能完成的事件比较单一一点
  // 1.添加购物车时如果已有该商品
  ADDCOUNTER(state, payload) {
    payload.count += 1
  },
  // 2.添加购物车时如果没有该商品
  ADDTOCART(state, payload) {
    // 默认选中商品
    payload.checked = true;
    state.cartList.push(payload)
    // 让购物车里的数据缓存在浏览器
    sessionStorage.setItem("cartList", JSON.stringify(state.cartList))
  },
  // 3.购物车中的勾选按钮点击状态改变
  CHECKED(state, payload) {
    payload.checked = !payload.checked;
  },
  // 4.使购物车中的所有商品处于选中状态
  CHECKALL(state) {
    state.cartList.forEach(item => item.checked = true)
  },
  // 5.使购物车中的所有商品处于非选中状态
  NOCHECKALL(state) {
    state.cartList.forEach(item => item.checked = false)
  },
  // 6.零钱操作
  ADDMONEY(state, payload) {
    state.userInfo.balance += payload
    // 让零钱数据缓存在浏览器
    sessionStorage.setItem("balance", state.userInfo.balance)
  },
  // 7.结算操作
  // 这里是金额的减少
  BUY(state, payload) {
    state.userInfo.balance -= payload
    // 数据存储到浏览器
    sessionStorage.setItem("balance", state.userInfo.balance)
  },
  // 这里是购物车商品的减少
  DELGOODS(state, payload) {
    // 过滤掉传来的商品，因为传过来的是选中的商品
    state.cartList = state.cartList.filter(item => !payload.includes(item))
    // 数据存储到浏览器
    sessionStorage.setItem("cartList", JSON.stringify(state.cartList))
    // 将已经购买的商品存入已购数组
    // console.log(payload);
    state.myGoods.push(...payload)
    // 数据存储到浏览器
    sessionStorage.setItem("myGoods", JSON.stringify(state.myGoods))
  },
  // 直接购买商品后将商品存入已购数组
  BUYSHOMETHING(state, payload) {
    // console.log(payload);
    // 将购买商品存入已购数组
    state.myGoods.push(payload)
    // 数据存储到浏览器
    sessionStorage.setItem("myGoods", JSON.stringify(state.myGoods))
  }
}

export default mutations