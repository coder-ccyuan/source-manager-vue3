<script setup>
import {onMounted, ref} from "vue";
import {useUserStore} from "@/store/userStore";
import articleApi from "@/api/articleApi.js";
import ArticleList from "@/components/ArticleList.vue";

const articleList = ref([]);
const userid = useUserStore().user.id
onMounted(async () => {
  articleList.value = await articleApi().getByAuthorId(userid)
})

</script>

<template>
  <ArticleList :articleList="articleList"></ArticleList>
</template>

<style scoped>

</style>