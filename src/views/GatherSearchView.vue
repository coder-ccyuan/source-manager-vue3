<script setup>
import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import MyDivider from "@/components/MyDivider.vue";
import articleApi from "@/api/articleApi.js";
import ArticleList from "@/components/ArticleList.vue";

const router = useRouter();
const route = useRoute();
const articleList = ref([]);
const searchValue = ref('');

/**
 * 搜索时把搜索栏数据同步到url中
 */
const onSearch = (text) => {
  searchValue.value = text
  router.push({
    query: {
      searchValue: text
    }
  })
}
/**
 * 聚合搜索
 */
const loadData = async (text) => {
  articleList.value = await articleApi().getArticleList(text);
}
/**
 * 监听属性，
 */
watch([searchValue], () => {
  loadData(searchValue.value)
  console.log("@@", searchValue.value)
})
/**
 * 加载就触发
 */
onMounted(() => {
  loadData(searchValue.value)

})
</script>
<template>
  <div class="search">
    <a-input-search
        placeholder="输入搜索内容"
        size="large"
        @search="onSearch"
    />
    <MyDivider/>
    <ArticleList :articleList="articleList"/>
  </div>
</template>

<style scoped>
.search {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
