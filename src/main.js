
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import * as Icons from "@ant-design/icons-vue";
const app = createApp(App)
import {QuillEditor} from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //引入持久化插件

const icons = Icons;
const pinia = createPinia() //创建pinia实例
pinia.use(piniaPluginPersistedstate) //将插件添加到 pinia 实例上
app.use(pinia)
app.use(router)
app.use(Antd);
app.mount('#app')
for (const i in icons) {
    app.component(i, icons[i]);
}
//注册富文本编辑器组件
app.component('QuillEditor', QuillEditor)