<template>
  <div style="text-align: center">
    <a-image style="margin: 0 auto" height="250px" src="src/images/OIG1.jpg" :preview="false">
    </a-image>
  </div>

  <a-form
      :model="formState"
      name="normal_login"
      class="login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <a-form-item
        label="账户"
        name="username"
        :rules="[{ required: true, message: '请输入你的账户！' }]"
    >
      <a-input v-model:value="formState.username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
        label="密码"
        name="password"
        :rules="rules.password"
    >
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon"/>
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item>
      <a-form-item name="remember" no-style>
        <a-checkbox v-model:checked="formState.remember">记住</a-checkbox>
      </a-form-item>
      <router-link class="login-form-register" to="/register">注册</router-link>
      <span style="float: right">|</span>
      <a class="login-form-forgot" href="">忘记密码</a>

    </a-form-item>

    <a-form-item>
      <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
        登录
      </a-button>
    </a-form-item>
  </a-form>
  <div class="logo" style="text-align: center;margin: 0 auto" >
    <a href="https://github.com/coder-ccyuan/source-manager-vue3" >
      <GithubOutlined style="font-size: 20px"/>
      GitHub</a>
  </div>
</template>
<script setup>
import {reactive, computed} from 'vue';
import userApi from "@/api/userApi";
import {useUserStore} from "@/store/userStore";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";

const router = useRouter();
const formState = reactive({
  username: '',
  password: '',
  remember: true,
});
const rules = {
  username: [
    { required: true, message: '请输入你的账户！' },
    {min: 5, max: 10, message: '用户名长度在5到10个字符之间'}
  ],
  password:[
    { required: true, message: '请输入你的密码！' },
    {min: 8, max: 16, message: '用户名长度在8到16个字符之间'}
  ]
}
const userStore=useUserStore();
const onFinish = values => {
  console.log('Success:', values);
  userApi().login(formState).then(res=>{
    if (res.code===0){
      message.success('登录成功');
      userStore.isLogin=true;
      userStore.user=res.data;
      router.push('/')
    }else{
      console.log(res.description);
      message.error('登录失败',res.description)
      alert('登录失败',res.description)
    }
  }).catch(err=>{
    console.log(err);
  })
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
</script>
<style scoped>
.login-form {
  max-width: 600px;
  margin: 10px auto;
}
.login-form-register {
  float: right;
}
.login-form-forgot {
  float: right;
}


.login-form-button {
  width: 100%;
}
</style>