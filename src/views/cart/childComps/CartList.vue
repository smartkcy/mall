<template>
  <div class="cart-list">
    <scroll class="content"
            :probe-type="0"
            :pull-up-load="true"
            ref="scroll">
      <cart-list-item v-for="(item , index) in cartList"
                      :item-info="item"
                      :key="index"/>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

import Scroll from "@/components/common/scroll/Scroll";

import CartListItem from "@/views/cart/childComps/CartListItem";

export default {
  name: "CartList",
  components: {Scroll, CartListItem},
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    this.$refs.scroll.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px);
}

.content {
  height: calc(100% - 49px - 40px);
  overflow: hidden;
}
</style>
