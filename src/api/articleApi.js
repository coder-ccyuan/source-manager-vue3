import axios from "@/plugins/axios";


export default function () {
    let data = [];

    // 方法
    async function getArticleList(searchValue) {
        try {
            // 发请求
            // 维护数据
            data = (await axios.post('/article/query', {
                title: searchValue,
                content: searchValue
            }));
        } catch (error) {
            // 处理错误
            console.log(error.message)
        }
        return data;
    }

    async function addArticle(paper) {
        try {
            // 发请求
            // 维护数据
            data = (await axios.post('/article/add', {
                title: paper.title,
                content: paper.content,
                cateId: paper.cateId
            }));
        } catch (error) {
            // 处理错误
            console.log(error.message)
        }
        return data;
    }

    async function deleteArticle(id) {
        try {
            // 发请求
            // 维护数据
            data = (await axios.post('/article/delete', {
                id: id
            }));
        } catch (error) {
            // 处理错误
            console.log(error.message)
        }
        return data;
    }

    async function articleUpdate(update) {
        try {
            // 发请求
            // 维护数据
            data = (await axios.post('/article/update', {
                content: update.content,
                coverImg: "",
                id: update.id,
                state: update.state,
                title: update.title
            }));
        } catch (error) {
            // 处理错误
            console.log(error.message)
        }
        return data
    }

    async function getByAuthorId(userId) {
        try {
            // 发请求
            // 维护数据
            data = (await axios.get('/article/getByAuthorId', {
                params: {
                    userId: userId
                }
            }));
        } catch (error) {
            // 处理错误
            console.log(error.message)
        }
        return data;
    }

    async function getByCateId(cateId) {
        try {
            data = (await axios.get('/article/getByCateId', {
                params: {
                    cateId: cateId
                }
            }));
        } catch (error) {
            // 处理错误
            console.log(error.message)
        }
        return data;
    }

    //向外部暴露数据
    return {getArticleList, addArticle, deleteArticle, getByAuthorId, articleUpdate, getByCateId}
}
