import state from "./state"

const actions = {
  // 1.添加购物车操作
  addCart(context, payload) {
    return new Promise((resolve) => {
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      )

      // 2.判断oldProduct
      if (oldProduct) {
        // oldProduct.count +=1
        context.commit('ADDCOUNTER', oldProduct)
        resolve("当前商品数量+1")
      } else {
        payload.count = 1
        context.commit('ADDTOCART', payload)
        resolve("添加购物车成功");

      }
    })
  },
  // 2.零钱操作
  addMoney(context, payload) {
    return new Promise((resolve) => {
      const money = Number((Math.random() * 9999).toFixed(2))
      context.commit("ADDMONEY", money)
      resolve(`成功领取${money}元`)
    })
  },
  // 3.结算操作，购买商品
  buy(context, payload) {
    return new Promise((resolve, reject) => {
      // 错误操作
      if (!context.getters.cartLength) {
        reject("购物车为空，无法结算")
      } else if (!context.getters.totalPrice) {
        reject("请选中购买商品")
      } else {
        if (
          context.state.userInfo.balance >= context.getters.totalPrice
        ) {
          // 这里要用两个，一个用来减钱，一个用来减商品
          context.commit("BUY", context.getters.totalPrice)
          context.commit("DELGOODS", context.getters.delgoods)
          resolve("购买成功")
        } else {
          reject("余额不足，无法购买")
        }
      }
    })
  },
  // 4.直接购买商品操作操作
  buysomething(context, payload) {
    return new Promise((resolve, reject) => {
      if (context.state.userInfo.balance >= payload.price) {
        context.commit("BUY", payload.price)
        context.commit("BUYSHOMETHING", payload)
        resolve("购买成功")
      } else {
        reject("余额不足，无法购买")
      }
    })
  }
}



export default actions