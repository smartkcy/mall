<template>
<!--  ref 如果是绑定在组件上面的，那么通过this.$refs.refname获取到的是一个组件对象
      ref 如果是绑定在元素上面的，那么通过this.$refs.refname获取到的是一个元素对象
/children-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      observeDOM:true,
      observeImage:true,
      //observeDOM:true,observeImage:true,会自动调用refresh（）
      click:true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
  //  2.监听滚动位置
    this.scroll.on('scroll',(position)=>{
      // console.log(position);
      this.$emit('scroll',position)
    })
    //3.监听上拉事件
    this.scroll.on('pullingUp',() =>{
      this.$emit('pullingUp')
    })
  },
  methods:{
    scrollTo(x,y,time = 300){
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>
