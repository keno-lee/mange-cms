<template>
  <div>
      <div class="news">
        <div class="title">
          <h4>{{info.title}}</h4>
        </div>
        <p>
          <span>
            发表时间: {{info.add_time | dateformat("YYYY-MM-DD HH:mm:ss")}}
          </span>
          <span class="mui-pull-right">点击: {{info.click}}次</span>
        </p>
        <hr>
        <!-- 预留插槽 -->
        <slot></slot>
        <div class="content" v-html="info.content"></div>
      </div>
  </div>
</template>

<script>
// 引入dateformat
import dateformat from "@/filters/dateformat"
export default {
    props:["info"],
    filters: {
        dateformat
    }
}
</script>
<style scoped>


</style>