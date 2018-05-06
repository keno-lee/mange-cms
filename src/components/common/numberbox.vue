<template>
    <div class="mui-numbox-cms">
        <button class="mui-btn mui-btn-numbox-minus-cms" type="button" @click="minus">-</button>
        <input class="mui-input-numbox-cms" type="number" v-model="num"/>
        <button class="mui-btn mui-btn-numbox-plus-cms" type="button" @click="plus">+</button>
    </div>
</template>

<script>
export default {
  props: ["min", "max", "step", "value"],
  data() {
    return {
      num: this.value
    };
  },
  methods: {
    minus() {
      if (this.num >= this.min + this.step) {
        this.num = +this.num - +this.step;
      } else {
        this.num = this.min;
      }
    },
    plus() {
      if (this.num <= this.max - this.step) {
        this.num = +this.num + +this.step;
      } else {
        this.num = this.max;
      }
    }
  },
  //  监视v-model中的value
  watch:{
      num(nv,ov){
        // 如果num变化了向父级传值          
        this.$emit("input", nv);
      }
  }
};
</script>
<style scoped>
.mui-numbox-cms {
  position: relative;

  display: inline-block;
  overflow: hidden;

  width: 120px;
  height: 35px;
  padding: 0 40px 0 40px;

  vertical-align: top;
  vertical-align: middle;

  border: solid 1px #bbb;
  border-radius: 3px;
  background-color: #efeff4;
}
.mui-numbox-cms [class*="numbox-btn"],
.mui-numbox-cms [class*="btn-numbox"] {
  font-size: 18px;
  font-weight: normal;
  line-height: 100%;

  position: absolute;
  top: 0;

  overflow: hidden;

  width: 40px;
  height: 100%;
  padding: 0;

  color: #555;
  border: none;
  border-radius: 0;
  background-color: #f9f9f9;
}
.mui-numbox-cms [class*="numbox-btn"]:active,
.mui-numbox-cms [class*="btn-numbox"]:active {
  background-color: #ccc;
}
.mui-numbox-cms [class*="numbox-btn"][disabled],
.mui-numbox-cms [class*="btn-numbox"][disabled] {
  color: #c0c0c0;
}
.mui-numbox-cms .mui-numbox-cms-btn-plus,
.mui-numbox-cms .mui-btn-numbox-plus-cms {
  right: 0;

  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.mui-numbox-cms .mui-numbox-cms-btn-minus,
.mui-numbox-cms .mui-btn-numbox-minus-cms {
  left: 0;

  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.mui-numbox-cms .mui-numbox-cms-input,
.mui-numbox-cms .mui-input-numbox-cms {
  display: inline-block;
  overflow: hidden;

  width: 100% !important;
  height: 100%;
  margin: 0;
  padding: 0 3px !important;

  text-align: center;
  text-overflow: ellipsis;
  word-break: normal;

  border: none !important;
  border-right: solid 1px #ccc !important;
  border-left: solid 1px #ccc !important;
  border-radius: 0 !important;
}

.mui-input-row .mui-numbox-cms {
  float: right;

  margin: 2px 8px;
}
</style>