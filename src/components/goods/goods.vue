<template>
  <div>
      <div class="goods-list">
        <div class="goods-item" v-for="(v, i) in goodslist" :key="i" @click="$router.push('/goods/detail/'+v.id)">
            <img :src="v.img_url" alt="">
            <h4>{{v.title}}</h4>
            <div class="info">
                <p class="price">
                    <span class="nowPrice">￥{{v.sell_price}}</span>
                    <span>
                        <del>￥{{v.market_price}}</del>
                    </span>
                </p>
                <p class="sale">
                    <span>热卖中</span>
                    <span>剩{{v.stock_quantity}}件</span>
                </p>
            </div>
        </div>
      </div>
        <button type="button" class="mui-btn mui-btn-red" @click="more" v-show="isShow">加载更多</button>
  </div>
</template>
<script>
// 引入axios
import axios from "axios";
// 引入mint-ui的toast工具
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      goodslist: [],
      isShow: true,
      pageindex: 1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    more() {
      this.pageindex++;
      this.getData();
    },
    getData() {
      axios({
        url: "http://www.escook.cn:3000/api/getgoods?pageindex=" + this.pageindex
      }).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.goodslist.push(...res.data.message);
          if (res.data.message.length == 0) {
            this.isShow = false;
            Toast({
              message: "No More Goods",
              position: "middle",
              duration: 3000
            });
          }
        }
      });
    }
  }
};
</script>
<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 3px;
}

.goods-list .goods-item {
  width: 48%;
  border: 1px solid #ccc;
  margin: 1%;
  box-shadow: 0 0 7px #aaa;
  padding: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.goods-list .goods-item img {
  width: 100%;
}

.goods-list .goods-item h4 {
  font-size: 14px;
}

.goods-list .goods-item .info {
  background-color: #eee;
}

.goods-list .goods-item .info p {
  margin: 0;
  margin-top: 10px;
  font-size: 13px;
}

.goods-list .goods-item .info p:nth-child(2) {
  display: flex;
  justify-content: space-between;
}

.goods-list .goods-item .info p:nth-child(1) .nowPrice {
  color: red;
  font-size: 15px;
  margin-right: 8px;
}

.mui-btn {
  width: 100%;
  margin-bottom: 5px;
}
</style>