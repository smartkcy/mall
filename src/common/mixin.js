
export const backTopMixin = {
  data: function () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick: function () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
}

