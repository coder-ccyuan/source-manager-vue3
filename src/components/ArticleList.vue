<script setup>
import {defineProps, onMounted} from 'vue'
import {useRoute, useRouter} from "vue-router";
import articleApi from "@/api/articleApi.js";
import {message} from "ant-design-vue";

defineProps(["articleList"]);
const route = useRoute();
const router = useRouter();
const deleteArticle = (id) => {
  articleApi().deleteArticle(id).then(res => {
    if (res.code === 0) {
      message.success("删除成功");
      router.go(0);
      // postList.value = postList.value.filter(item => item.id !== id);
    }
  })
}
onMounted(() => {

})
</script>
<template>
  <a-list item-layout="horizontal" :data-source="articleList.data">
    <template #renderItem="{ item }">
      <a-avatar :src="item.authorPic"/>
      {{ item.authorNickname }}
      <a-list-item>
        <a-list-item-meta>
          <template #title="">
            <RouterLink :to="{
                  path:'/articleDisplay',
                  query:{
                  title:item.title,
                  content:item.content,
                  userId: item.authorId,
                  createTime: item.createTime,
                  updateTime: item.updateTime,
                  userName: item.authorNickname,
                  userAvatar:item.authorPic
                       }}">
              {{ item.title }}
            </RouterLink>
          </template>
        </a-list-item-meta>
        <a-button @click="deleteArticle(item.id)" v-if="route.path==='/manageArticle'" type="primary" danger>
          <DeleteOutlined/>
        </a-button>
      </a-list-item>
    </template>
  </a-list>

</template>

<style scoped>

</style>