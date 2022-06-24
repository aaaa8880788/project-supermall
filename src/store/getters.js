const getters = {
  // 1.获取购物车商品数量
  cartLength(state) {
    return state.cartList.length
  },
  // 2.购物车所有商品汇总
  cartList(state) {
    return state.cartList
  },
  // 3.获取购物车中选中商品总价
  totalPrice(state) {
    return state.cartList.filter(
      item => item.checked
    ).reduce((pre, item) => {
      // 保留两位小数点
      let priceAll = parseFloat(pre) + parseFloat(item.price * item.count)
      return priceAll.toFixed(2)
    }, 0)
  },
  // 4.判断购物车里面的东西是否有被全部选中
  isSelAll(state) {
    // 进入判断证明购物车有东西
    if (state.cartList.length) {
      return state.cartList.every(item => item.checked)
    }
    // 没进入判断证明购物车没东西
    return false
  },
  // 5.返回购物车中勾选中商品的总数
  totalNum(state) {
    return state.cartList
      .filter((item) => item.checked).length
  },
  // 6.在购买东西成功后在购物车中删去购买成功的商品
  // 这里是返回购物车中选中的商品
  delgoods(state) {
    if (state.cartList.length) {
      return state.cartList.filter(item => item.checked)
    }
  },
  // 7.获取已购商品的数量
  getMyGoods(state) {
    return state.myGoods.length
  }
}
export default getters