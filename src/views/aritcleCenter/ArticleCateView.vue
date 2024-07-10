<script setup>


import {onMounted, ref} from "vue";
import articleApi from "@/api/articleApi.js";
import ArticleList from "@/components/ArticleList.vue";
import HeadView from "@/views/HeadView.vue";
import {useRoute} from "vue-router";

const route = useRoute()
const articleList = ref([])
const loadData = async (cateId) => {
  articleList.value = await articleApi().getByCateId(cateId)
}
onMounted(() => {
  const cateId = route.query.cateId
  loadData(cateId);
})
</script>

<template>
  <HeadView></HeadView>
  <a-divider></a-divider>
  <h1>{{ route.query.cateName }}分类</h1>
  <ArticleList :articleList="articleList"/>
</template>

<style scoped>

</style>