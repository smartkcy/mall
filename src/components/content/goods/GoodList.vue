<template>
  <div class="goods">
    <GoodsListItem v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";

export default {
  name: "GoodList",
  components:{
    GoodsListItem
  },
  props: {
    goods:{
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods{
  display: flex;
  /*根据宽度，判断一行显示多少个*/
  flex-wrap: wrap;
  /*均等分*/
  justify-content: space-around;

  padding: 2px;
}
</style>
