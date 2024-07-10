
import axios from "@/plugins/axios";


export default function () {
    let data=[];

    // 方法
    async function getCategoryList(searchValue) {
        try {
            // 发请求
            // 维护数据
            data=(await axios.post('/category/query' ,{
                cateName: "",
                cateAlias: "",
            }));
        } catch (error) {
            // 处理错误
            console.log(error.message)
        }
        return data;
    }
    async function addCategory(paper) {
        try {
            // 发请求
            // 维护数据
            data = (await axios.post('/category/add', {
                cateName: paper.cateName,
                cateAlias: paper.cateAlias,
            }));
        } catch (error) {
            // 处理错误
            console.log(error.message)
        }
        return data;
    }
    async function deleteCategory(id) {
        try {
            // 发请求
            // 维护数据
            data = (await axios.post('/category/delete', {
                id:id
            }));
        } catch (error) {
            // 处理错误
            console.log(error.message)
        }
        return data;
    }
    async function categoryUpdate(update) {
        try {
            // 发请求
            // 维护数据
            data = (await axios.post('/category/update',{
                cateAlias: update.cateAlias,
                cateName: update.cateName,
                id: update.id,
                desc: update.desc,
            }));
        } catch (error) {
            // 处理错误
            console.log(error.message)
        }
        return data
    }
    //向外部暴露数据
    return {getCategoryList,addCategory,deleteCategory,categoryUpdate}
}
