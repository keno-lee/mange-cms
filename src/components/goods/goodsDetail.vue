<template>
  <div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-swipe :auto="4000">
                        <mt-swipe-item v-for="(v, i) in lunbos" :key="i" >
                            <img :src="v.src">
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="price">
                        <span>市场价：
                            <del>￥{{goodsInfo.market_price}}</del>
                        </span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>销售价：
                            <span class="sale_price">￥{{goodsInfo.sell_price}}</span>
                        </span>
                    </div>
                    <div class="count">
                        <span>购买数量：</span>
                        <!-- numberbox -->
                        <numberbox :min="0" :max="10" :step="2" v-model="count"></numberbox>
                    </div>
                    <div class="btns">
                        <mt-button type="primary">立即购买</mt-button>
                        <mt-button type="danger" @click="addToCart">加入购物车</mt-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsInfo.add_time | dateformat("YYYY-MM-DD HH:mm:ss")}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" :plain="true">商品描述</mt-button>
                <br>
                <mt-button type="danger" size="large" :plain="true">商品评论</mt-button>
            </div>
        </div>
        <transition @before-enter="beforeEnter" @enter="enter">
            <div class="redball" v-show="isShowBall"></div>
        </transition>

  </div>
</template>
<script>
// 引入axios
import axios from "axios";
// 引入dateformat
import dateformat from "@/filters/dateformat";
import numberbox from "@/components/common/numberbox";


export default {
  data() {
    return {
      goodsInfo: {},
      lunbos: [],
      count: 0,
      isShowBall:false
    };
  },
  created() {
    // 轮播图借口
    axios({
      url:
        "http://www.escook.cn:3000/api/getthumimages/" + this.$route.params.id
    }).then(res => {
      console.log(res);
      if (res.status == 200) {
        this.lunbos = res.data.message;
      }
    });
    // 商品信息
    axios({
      url:
        "http://www.escook.cn:3000/api/goods/getinfo/" + this.$route.params.id
    }).then(res => {
      console.log(res);
      if (res.status == 200) {
        this.goodsInfo = res.data.message[0];
      }
    });
  },
  methods: {
    addToCart(){
      this.isShowBall = true;
      // 获取到数量添加到store中
      this.$store.commit('addToCarts',{
        id: this.$route.params.id,
        count: this.count
      });
    },
    beforeEnter(el) {
      //给元素加上 过渡效果
      el.style.top = "445px";
      el.style.left = "50%";
    },
    enter(el) {
      //触发一次重绘，先让上面的transition生效
      el.style.transition = "all 2s linear";      
      el.offsetWidth;
      el.style.top = (640 + window.pageYOffset)  +"px";
      el.style.left = "64%";
      this.isShowBall = false;
    },
  },
  filters: {
    dateformat
  },
  components: {
    numberbox
  }
};
</script>
<style scoped>

.redball {
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  z-index: 1000;
  top: 445px;
  left: 50%; 
}

.mint-swipe {
  height: 180px;
}
.mint-swipe img {
  height: 100%;
}

.mint-swipe-item {
  text-align: center;
}

.mui-card-content-inner > div {
  margin: 10px 0;
}

.sale_price {
  color: red;
  font-size: 18px;
}

.mui-card-footer {
  display: block;
}
</style>