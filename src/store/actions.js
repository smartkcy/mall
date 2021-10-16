import {ADD_COUNTER,ADD_TO_CART} from "@/store/mutation-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve , reject) => {
      // 1.查找数组中是否有该商品
      let oleProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oleProduct) {
        context.commit(ADD_COUNTER, oleProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新的商品')
      }
    })
  }
}
