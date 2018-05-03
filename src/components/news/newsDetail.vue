<template>
  <div>
      <div class="news">
        <div class="title">
          <h4>{{newsinfo.title}}</h4>
        </div>
        <p>
          <span>
            发表时间: {{newsinfo.add_time | dateformat("YYYY-MM-DD HH:mm:ss")}}
          </span>
          <span class="mui-pull-right">点击: {{newsinfo.click}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content"></div>
      </div>
      <div class="comment">
       
       <comment :artid="$route.params.id"></comment>

      </div>
  </div>
</template>

<script>

// 引入axios
import axios from "axios";
// 引入dateformat
import dateformat from "@/filters/dateformat"
// 引入评论模块
import comment from "@/components/common/comment"

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
      // console.log(res);
      if (res.status == 200) {
        this.newsinfo = res.data.message[0];
      }
    })
  },
  filters: {
    dateformat
  },
  components:{
    comment
  }
}
</script>
<style scoped>
 textarea {
   margin-bottom: 0;
 }

</style>