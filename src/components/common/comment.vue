<template>
  <div>
       <h4>发表评论</h4>
        <hr>
        <textarea name="" id="" cols="30" rows="4" v-model="content"></textarea>
        <button type="button" class="mui-btn mui-btn-primary" @click="addcomment">发表评论</button>

        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(v, i) in comment" :key="i">
					<a href="javascript:;">
							<p><span>第{{i+1}}楼</span> <span>发表时间:{{v.add_time |  dateformat("YYYY-MM-DD HH:mm:ss") }}</span> <span class="mui-pull-right">{{v.user_name}}</span></p>  
						<img class="mui-media-object mui-pull-right" src="@/assets/images/menu1.png">
						<div class="mui-media-body">
							<p class="mui-ellipsis">{{v.content}}</p>
						</div>
					</a>
				</li>
		</ul>

        <button type="button" class="mui-btn mui-btn-red" @click="more" v-show="isShow">加载更多</button>
        
    </div>
</template>

<script>
// 引入axios
import axios from "axios";
// 引入mint-ui的toast工具
import { Toast } from "mint-ui";
// 引入dateformat
import dateformat from "@/filters/dateformat";

export default {
  data() {
    return {
      comment: [],
      pageindex: 1,
      isShow: true,
      content: ""
    };
  },
  props: ["artid"],
  methods: {
    getData() {
      axios({
        url:
          "http://www.escook.cn:3000/api/getcomments/" +
          this.artid +
          "?pageindex=" +
          this.pageindex
      }).then(res => {
        console.log(res);
        if (res.status == 200) {
          // this.comment = res.data.message;
          this.comment.push(...res.data.message);
          if (res.data.message.length == 0) {
            this.isShow = false;
            Toast({
              message: "No More Comments",
              position: "middle",
              duration: 3000
            });
          }
        }
      });
    },
    more() {
      this.pageindex++;
      this.getData();
    },
    addcomment() {
      // alert(this.content)
      if (this.content.trim()) {
        axios({
          url: "http://www.escook.cn:3000/api/postcomment/" + this.artid,
          method: "post",
          data: "content=" + this.content
        }).then(res => {
          //   console.log(res);
        //  模拟数据更新 
          if (res.status == 200) {
            this.comment.unshift({
              user_name: new Date(),
              content: this.content,
              user_name: "匿名用户"
            });
          }
        });
      }
    }
  },
  created() {
    // alert(this.artid);
    this.getData();
  },
  filters: {
    dateformat
  }
};
</script>
<style scoped>
.mui-btn {
  width: 100%;
  margin-bottom: 5px;
}
</style>