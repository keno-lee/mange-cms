<template>
  <div>
      <detail :info="newsinfo"></detail>
      <div class="comment">
       <comment :artid="$route.params.id"></comment>
      </div>
  </div>
</template>

<script>

// 引入axios
import axios from "axios";
// 引入评论模块
import comment from "@/components/common/comment"
// 引入详情模块
import detail from "@/components/common/detail"


export default {
  data(){
    return {
      newsinfo: {}
    }
  },
  created(){
    axios({
      url:"http://www.escook.cn:3000/api/getnew/"+ this.$route.params.id
    }).then(res => {
      console.log(res);
      if (res.status == 200) {
        this.newsinfo = res.data.message[0];
      }
    })
  },
  components:{
    comment,
    detail
  }
}
</script>
<style scoped>
 textarea {
   margin-bottom: 0;
 }

</style>