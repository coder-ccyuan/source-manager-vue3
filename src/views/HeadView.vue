<script setup>
import {useUserStore} from "@/store/userStore";
import userApi from "@/api/userApi";
import {message} from "ant-design-vue";
import {useRoute, useRouter} from "vue-router";

const userStore=useUserStore()
const user=userStore.user;
const router=useRouter()
const route=useRoute();
const logout=()=>{
  userApi().logout().then(res=>{
    if (res.code===0){
      //清除sessionStorage
      userStore.clearUser();

      message.success("登出成功")
      router.push('/')
    }else{
      message.error('登出失败')
    }
  })
}
const toUserCenter=()=>{
  router.push('/userCenter')
}
const toArticleCenter=()=>{
  router.push('/articleCenter')
}
</script>

<template>
  <!--  github 仓库-->
  <div class="logo" v-if="route.path==='/'||route.path==='/'||route.path==='/paper'||
route.path==='/picture'||route.path==='/user'">
    <a href="https://github.com/coder-ccyuan/source-back-manager-system">
      <GithubOutlined style="font-size: 30px"/>
      GitHub</a>
  </div>
  <!--  返回按钮-->
  <div v-else style="float: left">
    <a-button style="" type="default" @click="router.push('/')">回到首页</a-button>
  </div>
  <span style="font-size: 20px; font-style: italic ;margin: 0 30%;color: #4eb2f1">source 文章后台管理系统</span>
  <!-- 未登录状态-->
  <div class="user" v-if="!userStore.isLogin" >
    <a-space>
      <router-link to="/login">
        <span style="font-size: large">点击登录</span>
      </router-link>
      <a-avatar :src="userStore.user.userPic" size="large" alt="点击登录"/>
    </a-space>
  </div>
  <!--  用户下拉菜单 登录-->
  <div class="user" v-if="userStore.isLogin">
    <a-space>
      <!--用户名-->
      <span style="  font-family:Arial,Helvetica,sans-serif;font-size: large">{{ user.nickname }}</span>
      <a-dropdown>
        <template #overlay>
          <a-menu>
            <a-menu-item key="userCenter" @click="toUserCenter">
              用户中心
            </a-menu-item>
            <a-menu-item key="articleCenter" @click="toArticleCenter">
              文章中心
            </a-menu-item>
            <a-menu-item key="userLogout" @click="logout">
              登出
            </a-menu-item>
          </a-menu>
        </template>
        <a-avatar :src=user.userPic size="large"/>
      </a-dropdown>
    </a-space>
  </div>
</template>

<style scoped>
div.user {
  display: inline-block;
  float: right;
  margin-bottom: 5px;
}
div.logo{
  display: inline-block;
}
a{
  color: black;
}
</style>