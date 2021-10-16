<template>
  <div class="cart">
    <!--    导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!--    商品列表-->
    <cart-list/>
<!--    底部汇总-->
    <cart-botton-bar/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

import CartList from "@/views/cart/childComps/CartList";
import CartBottonBar from "@/views/cart/childComps/CartBottonBar";

import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components: {
    CartList,
    CartBottonBar,
    NavBar,
  },
  data() {
    return {}
  },
  computed: {
    // cartLength(){
    //   return this.$store.getters.cartLength
    // }
    //第一种用法
    ...mapGetters([
      "cartLength"
    ])
    // 第二种用法
    // ...mapGetters({
    //   length:"cartLength",
    //   list:"cartList"
    // })
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  /*font-weight: 700;*/
}
</style>
