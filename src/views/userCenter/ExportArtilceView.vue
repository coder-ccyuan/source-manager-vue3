<template>
  <a-input size="large" :bordered="false" placeholder="请输入标题" v-model:value="title"></a-input>
  <QuillEditor theme="snow" content-type='html' v-model:content="content" @blur="articleStore.save(content,title)"/>
  <a-button type="default" style="width: 200px;margin: 10px " @click="articleStore.save(content,title)">保存</a-button>
  <a-button type="primary" style="width: 200px;margin: 10px" @click="addPaper">发布</a-button>
</template>
<script setup>
import {ref, watch} from "vue";
import articleApi from "@/api/articleApi";
import {useUserStore} from "@/store/userStore";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";
import {useArticleStore} from "@/store/useArticleStore.js";

const articleStore = useArticleStore();
const content = ref(articleStore.content)
const title = ref(articleStore.title);
const user = useUserStore().user;
const router = useRouter();
const addPaper = () => {
  articleApi().addArticle({
    title: title.value,
    content: content.value
  }).then((res) => {
    if (res.code === 0) {
      message.success("发布成功")
    }
  })
}
watch([title, content], () => {
  articleStore.save(content.value, title.value);
})
</script>
<style scoped>
.header {
  background-color: white;
}

</style>