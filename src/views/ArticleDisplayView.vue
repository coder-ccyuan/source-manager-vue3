<script setup>
import {useRoute} from "vue-router";
import HeadView from "@/views/HeadView.vue";

const route = useRoute();
const article = route.query;
</script>

<template>
  <HeadView/>
  <a-divider/>
  <h1 style="text-align: center">{{ article.title }}</h1>
  <span>
    <a-avatar :src="article.userAvatar"></a-avatar>
    作者：{{ article.userName }}</span>
  <div v-html="article.content" class="content"></div>
  <a-divider/>
  <span>发布时间：{{ article.createTime }}</span>
  <br>
  <span>更新时间：{{ article.updateTime }}</span>
</template>

<style scoped>
.content {
  margin: 10px auto;
  max-width: 1024px;
}
</style>