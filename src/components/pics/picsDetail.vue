<template>
  <div>
    <detail :info="picinfo">
      <div class="mui-clearfix">
        <slot>
          <!-- <img :src="v.src" alt="" v-for="(v, i) in piclist" :key="i" @click="preview"> -->
          <vue-preview :slides="piclist"></vue-preview>
        </slot>
      </div>
    </detail>
    <comment :artid="$route.params.id"></comment>
  </div>
</template>
<script>
// 引入axios
import axios from "axios";
// 引入详情模块
import detail from "@/components/common/detail";
import comment from "../common/comment";

export default {
  data(){
    return {
      picinfo:{},
      piclist:[]
    }
  },
  created(){
    axios({
      url:"http://www.escook.cn:3000/api/getimageInfo/"+ this.$route.params.id
    }).then(res => {
      console.log(res);
      if (res.status == 200) {
        this.picinfo = res.data.message[0];
      }
    });
    axios({
      url:"http://www.escook.cn:3000/api/getthumimages/"+ this.$route.params.id
    }).then(res => {
      console.log(res);
      if (res.status == 200) {
        res.data.message.forEach(v => {  
          v.src = v.src;
          v.msrc = v.src;
          v.alt = "pic";
          v.title = "preview";
          v.w = 400;
          v.h = 400;
        });
        this.piclist = res.data.message;
        console.log(this.piclist);
        
      }
    });
  },
  components:{
    detail,
    comment
  }
}
</script>
<style>

.my-gallery img{
  /* width: 20%; */
  width: 100%;
  margin: 1%;
  box-shadow: 0 0 3px 0px;
}

figure{
    display: inline-block;
    margin: 5px;
    width: 20%;
}
</style>