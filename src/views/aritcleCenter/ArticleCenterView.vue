<script setup>
import HeadView from "@/views/HeadView.vue";
import categoryApi from "@/api/categoryApi.js";
import {onMounted, reactive, ref} from "vue";
import {useUserStore} from "@/store/userStore.js";
import {message} from "ant-design-vue";
import {createWebHistory as route} from "vue-router/dist/vue-router.esm-browser.js";
import router from "@/router/index.js";

const list = ref([]);
const open = ref(false)
const data = reactive({
  cateName: '',
  cateAlias: ''
})
const loadData = async () => {
  list.value = await categoryApi().getCategoryList();
}
onMounted(() => {
  loadData();
})
const addCategory = async () => {
  const res = await categoryApi().addCategory(data)
  if (res.code === 0) {
    message.success('添加成功');
    open.value = false;
    route.go('/articleCenter');
  } else {
    message.error('添加失败');
  }
}
</script>

<template>
  <HeadView></HeadView>
  <a-divider></a-divider>
  <h1>文章分类</h1>
  <div class="card" v-for="item in list.data" :key="item.id" @click="router.push({
    path:'/articleCate',
    query: {
      cateId:item.id,
      cateName: item.cateName
    }
  })">
    <a-card :title="item.cateName" :bordered="false" style="width: 300px">
      <p>{{ item.cateAlias }}</p>
    </a-card>
  </div>

  <div style="width: 100px" @click="open=true" v-if="useUserStore().user.role===1">
    <PlusSquareOutlined style="font-size: 50px"/>
  </div>
  <a-modal v-model:open="open" title="添加分类信息">
    <template #footer>
      <a-button key="back" @click="open=false">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="addCategory">添加</a-button>
    </template>
    分类名：
    <a-input v-model:value="data.cateName"/>
    分类别名：
    <a-input v-model:value="data.cateAlias"/>
  </a-modal>
</template>

<style scoped>
div.card {
  display: inline-block;
  margin: 10px 20px;
}
</style>