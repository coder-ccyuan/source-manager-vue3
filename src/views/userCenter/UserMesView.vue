<template>
  <a-descriptions title="用户信息" :bordered="true">
    <a-descriptions-item label="昵称">{{userData.nickname}}</a-descriptions-item>
    <a-descriptions-item label="用户名">{{ userData.username }}</a-descriptions-item>
    <a-descriptions-item label="权限">{{ userData.role==0?'普通用户':'管理员' }}</a-descriptions-item>
  </a-descriptions>
  <a-button @click="edit" type="primary" >
    <template #icon>
      <EditOutlined />
    </template>
    编辑
  </a-button>
  <div>
  <a-modal v-model:open="open" title="编辑个人信息">
    <template #footer>
      <a-button key="back" @click="open=false">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="changUser">更改</a-button>
    </template>
    昵称：<a-input v-model:value="userData.username"/>
    头像：<a-input v-model:value="userData.userAvatar"/>
  </a-modal>
  </div>
</template>
<script setup>
import {reactive, ref} from "vue";
import {useUserStore} from "@/store/userStore";
import userApi from "@/api/userApi";
import {message} from "ant-design-vue";

let userData = reactive({
  "id": -1,
  "username": "",
  "nickname": "",
  "userPic": "",
  "role": 0,
})
const user = useUserStore().user;
userData=user;
const open=ref(false);
const edit = () => {
  open.value = true;
}
const changUser = () => {
  userApi().update({
    "id": userData.id,
    "nickname": userData.nickname,
    "userPic": userData.userPic,
  }).then(res=>{
    if (res.code===20000){
      message.success("更改成功")
      open.value = false;
    }else{
      message.error("更改失败")
    }
  })
}
</script>
<style scoped>
</style>