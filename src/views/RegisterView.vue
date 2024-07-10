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
        label="设置账户"
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
        label="设置密码"
        name="password"
        :rules="rules.password"
    >
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon"/>
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item
        label="确认密码"
        name="checkPassword"
        :rules="rules.checkPassword"
    >
      <a-input-password v-model:value="formState.checkPassword">
        <template #prefix>
          <LockOutlined class="site-form-item-icon"/>
        </template>
      </a-input-password>
    </a-form-item>
    <router-link class="login-form-register" to="/login">登录</router-link>
    <br>
    <a-form-item>
      <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
        注册
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
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";

const router = useRouter();
const formState = reactive({
  username: '',
  password: '',
  checkPassword:'',
});
const rules = {
  username: [
    { required: true, message: '请输入你的账户！' },
    {min: 5, max: 10, message: '用户名长度在5到10个字符之间'}
  ],
  password:[
    { required: true, message: '请输入你的密码！' },
    {min: 8, max: 16, message: '用户名长度在8到16个字符之间'}
  ],
  checkPassword:[
    { required: true, message: '请输入你的密码！' },
    {min: 8, max: 16, message: '用户名长度在8到16个字符之间'}
  ]
}
const onFinish = () => {
  if (formState.checkPassword!==formState.password){
    alert('两次输入的密码不相同')
    return;
  }
  userApi().register(formState).then(res=>{
    if (res.code===0){
      message.success('注册成功');
      router.push('/login')
    }else{
      console.log(res.description);
      message.error('注册失败',res.description)
      alert('注册失败'+res.description)
    }
  }).catch(err=>{
    console.log(err);
  })
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password&&formState.checkPassword);
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