<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(v,i) in swipepic" :key="i"><img :src="v.img"></mt-swipe-item>
    </mt-swipe>
      <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#/news">
          <img src="@/assets/images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#/pics/0">
          <img src="@/assets/images/menu2.png" alt="">          
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#/goods">
          <img src="@/assets/images/menu3.png" alt="">
          <div class="mui-media-body">商品购物</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="javascript:;">
          <img src="@/assets/images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="javascript:;">
          <img src="@/assets/images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="javascript:;">
          <img src="@/assets/images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>

  </div>
</template>


<script>

// 引入axios
import axios from "axios";

export default {
  data(){
    return {
      swipepic:[]
    }
  },
  created(){
    axios({
      url:"http://www.escook.cn:3000/api/getlunbo"
    }).then(res=>{
        // console.log(res);
      if(res.status == 200){
        this.swipepic = res.data.message;
        
      }
    })
  }
};

</script>
<style scoped>
.mint-swipe {
  height: 160px;
}
.mint-swipe img {
  width: 100%;
}
.mui-table-view {
  background-color: #fff;
}
.mui-table-view img {
  width: 60%;
}
</style>
