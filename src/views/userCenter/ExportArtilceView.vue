<template>
  <a-input size="large" :bordered="false" placeholder="请输入标题" v-model:value="title"></a-input>
  <a-select
      v-model:value="value"
      show-search
      @change="handleChange"
      placeholder="选择类别"
      style="width: 200px"
      :options="options"
      :filter-option="filterOption"
  ></a-select>
  <QuillEditor theme="snow" content-type='html' v-model:content="content" @blur="articleStore.save(content,title)"/>
  <a-button type="default" style="width: 200px;margin: 10px " @click="articleStore.save(content,title)">保存</a-button>
  <a-button type="primary" style="width: 200px;margin: 10px" @click="addPaper">发布</a-button>
</template>
<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import articleApi from "@/api/articleApi";
import {useUserStore} from "@/store/userStore";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";
import {useArticleStore} from "@/store/useArticleStore.js";
import categoryApi from "@/api/categoryApi.js";
import {filterOption} from "ant-design-vue/es/vc-mentions/src/util.js";

const articleStore = useArticleStore();
const content = ref(articleStore.content)
const title = ref(articleStore.title);
const user = useUserStore().user;
const router = useRouter();
var category = ref([]);
let cateId = reactive(undefined);
const options = ref([]);
const value = ref(undefined);
const addPaper = () => {
  articleApi().addArticle({
    title: title.value,
    content: content.value,
    cateId: cateId
  }).then((res) => {
    if (res.code === 0) {
      message.success("发布成功")
    }
  })
}
const loadData = async () => {
  const res = await categoryApi().getCategoryList();
  category.value = res.data;
  res.data.forEach((item) => {
    console.log(item)
    options.value.push({
      value: item.id,
      label: item.cateName
    })
  })
}
const handleChange = (value) => {
  cateId=value;
}
onMounted(() => {
  loadData();
})
watch([title, content], () => {
  articleStore.save(content.value, title.value);
})
</script>
<style scoped>
.header {
  background-color: white;
}

</style>