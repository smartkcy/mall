<template>
    <Swiper class="swiper-detail">
      <SwiperItem  v-for="item in topImages">
        <img :src="item">
      </SwiperItem>
      <detail-base-info/>
    </Swiper>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper";

import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";

export default {
  name: "DetailSwiper",
  components:{
    Swiper,
    SwiperItem,
    DetailBaseInfo
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.swiper-detail{
  height: 300px;
  overflow: hidden;
}
</style>
