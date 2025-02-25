import axios from "axios";
import {useUserStore} from "@/store/userStore";

const instance = axios.create({
    baseURL: 'http://localhost:8090/api',
    timeout: 10000,
    withCredentials: true
});
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code===40100){
        alert("会话过期，重新登录")
        console.log(useUserStore().isLogin)
        useUserStore().isLogin=false;
        console.log(useUserStore().isLogin)
    }
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default instance