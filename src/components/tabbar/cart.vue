<template>
    <div>
        <div class="goods-list">
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner" v-for="(v,i) in list" :key="i">
                        <mt-switch v-model="v.isChecked"></mt-switch>
                        <img :src="v.thumb_path">
                        <div class="info">
                            <h4>{{v.title}}</h4>
                            <div class="box">
                                <span class="price">￥{{v.sell_price}}</span>
                                <numberbox :min="0" :max="Infinity" :step="1" v-model="v.count"></numberbox>
                                <a href="#">删除</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="amount">
                        <p>总计（不含运费）</p>
                        <p>
                            已勾选商品
                            <span class="red">{{totalCount}}</span> 件 总价：
                            <span class="red">￥{{totalPrice}}</span>
                        </p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import numberbox from "@/components/common/numberbox";
// 引入axios
import axios from "axios";

export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    // 首先获取本地存储中的数据
    console.log(this.$store.getters.getId);
    // xios
    axios({
      url:
        "http://www.escook.cn:3000/api/goods/getshopcarlist/" +
        this.$store.getters.getId
    }).then(res => {
      console.log(res);
      if (res.status == 200) {
        // this.list = res.data.message;
        res.data.message.forEach(v => {
          v.count = this.$store.getters.getCountById(v.id);
          v.isChecked = false;
        });
        this.list = res.data.message;
      }
    });
    // 获取数量
  },
  components: {
    numberbox
  },
  watch: {
    list: {
      handler(nv, ov) {
        this.$store.commit("updateToCarts", nv);
      },
      deep: true
    }
  },
  computed: {
    totalCount() {
      var result = 0;
      this.list.forEach(v => {
        if(v.isChecked){
          result += v.count;
        }
      });
      return result;
    },
    totalPrice() {
      var totalPrice = 0;
      this.list.forEach(v => {
        if(v.isChecked){
        totalPrice += v.count * v.sell_price;
        }
      });
      return totalPrice;
    }
  }
};
</script>
<style scoped>
img {
  width: 20%;
}
.goods-list .mui-card-content-inner .thumb_img {
  width: 60px;
  height: 60px;
}

.goods-list .mui-card-content-inner .info {
  flex: 1;
}

.goods-list .mui-card-content-inner .info h4 {
  font-size: 14px;
}

.goods-list .mui-card-content-inner .info .box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goods-list .mui-card-content-inner .info .box .price {
  font-size: 16px;
  color: red;
}

.goods-list .mui-card-content-inner {
  display: flex;
}

.mui-card-content-inner .amount {
  flex: 1;
}

.mui-card-content-inner .red {
  color: red;
  font-size: 16px;
  font-weight: bold;
}

.mui-card-content-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>