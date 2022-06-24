const state = {
  // 购物车列表信息
  cartList: JSON.parse(sessionStorage.getItem("cartList")) || [],
  // 用户信息
  userInfo: {
    balance: Number(sessionStorage.getItem("balance")) || 0,
    discount: 0,
    point: 0
  },
  // 已购商品
  myGoods: JSON.parse(sessionStorage.getItem("myGoods")) || []
}

export default state