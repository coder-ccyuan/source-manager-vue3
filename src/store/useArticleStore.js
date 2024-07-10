import {defineStore} from 'pinia'
export const useArticleStore=defineStore('articleContent',{
    // 动作
    actions:{
        save(content,title){
            this.content=content;
            this.title=title;
        }
    },
    // 状态
    state(){
        return {
            content:"",
            title:""
        }
    },
    // 计算
    getters:{},
    // persist:true
    persist: {
        key: 'articleStorage', //存储名称
        storage: localStorage ,// 存储方式
        paths: ['content','title'], //指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state
    },
})