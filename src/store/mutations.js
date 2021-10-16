import {ADD_COUNTER,ADD_TO_CART} from "@/store/mutation-types";

export default {
    //mutations唯一目的就是修改state中的状态
    //mutation中每一个方法尽可能完成的事情比较单一一点
    [ADD_COUNTER](state, payload) {
      payload.count++
    },
    [ADD_TO_CART](state, payload) {
      payload.checked = false
      state.cartList.push(payload)
    }
}
