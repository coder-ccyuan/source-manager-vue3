import {createRouter, createWebHistory} from 'vue-router'
import IndexView from "@/views/IndexView.vue";
import {useUserStore} from "@/store/userStore.js";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ArticleDisplayView from "@/views/ArticleDisplayView.vue";
import UserIndexView from "@/views/userCenter/UserIndexView.vue";
import ManageArticleView from "@/views/userCenter/ManageArticleView.vue";
import UserMesView from "@/views/userCenter/UserMesView.vue";
import ExportArtilceView from "@/views/userCenter/ExportArtilceView.vue";
import ArticleCenterView from "@/views/aritcleCenter/ArticleCenterView.vue";
import ArticleCateView from "@/views/aritcleCenter/ArticleCateView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: IndexView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/articleDisplay',
            name: 'articleDisplay',
            component: ArticleDisplayView
        },
        {
            path: '/userCenter',
            name: 'userCenter',
            component: UserIndexView,
            children: [
                {
                    path: '/manageArticle',
                    name: 'manageArticle',
                    component: ManageArticleView
                },
                {
                    path: '/userMes',
                    name: 'userMes',
                    component: UserMesView
                },
                {
                    path: '/exportArticle',
                    name: 'exportArticle',
                    component: ExportArtilceView
                }
            ]
        },
        {
            path:'/articleCenter',
            name:'articleCenter',
            component: ArticleCenterView
        },
        {
            path:'/articleCate',
            name:'articleCate',
            component: ArticleCateView
        }
    ]
})
/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {
    console.log('beforeEach', to, from)
    console.log(useUserStore().isLogin)
    if (!useUserStore().isLogin) { //判断当前路由是否需要进行权限控制
        if (to.path !== '/userCenter' && to.path !== '/userMes' && to.path !== '/managePaper' && to.path !== '/exportPaper') {
            next();
        } else {
            alert("请登录")
        }

    } else {
        next() //放行
    }
})
export default router
