import axios from "@/plugins/axios";

export default function () {
    let data=[];
    async function getUserList(searchValue) {
        try {
            // 发请求
            // 维护数据
            data=(await axios.get('/user/query', {
                params: {
                    nickname: searchValue
                }
            }));
        } catch (error) {
            // 处理错误
            console.log(error.message)
        }
        return data
    }

    async function login(loginP) {
        try {
            // 发请求
            // 维护数据
            data = (await axios.post('/user/login', {
                "username": loginP.username,
                "password": loginP.password
            }));
        } catch (error) {
            // 处理错误
            console.log(error.message)
        }
        return data
    }
    async function register(registerP) {
        try {
            // 发请求
            // 维护数据
            data = (await axios.post('/user/register', {
                "username": registerP.username,
                "password": registerP.password,
                "checkPassword": registerP.checkPassword
            }));
        } catch (error) {
            // 处理错误
            console.log(error.message)
        }
        return data
    }
    async function logout() {
        try {
            // 发请求
            // 维护数据
            data = (await axios.get('/user/logout'));
        } catch (error) {
            // 处理错误
            console.log(error.message)
        }
        return data
    }
    async function update(up) {
        try {
            // 发请求
            // 维护数据
            data = (await axios.post('/user/update',{
                "email": up.email,
                "nickname": up.nickname,
                "userPic": up.userPic
            }));
        } catch (error) {
            // 处理错误
            console.log(error.message)
        }
        return data
    }

    async function loginUser(id) {
        try {
            // 发请求
            // 维护数据
            data = (await axios.get('/user/loginUser', {
            }));
        } catch (error) {
            // 处理错误
            console.log(error.message)
        }
        return data;
    }
    //向外部暴露数据
    return {getUserList,login,logout,update,loginUser,register}
}
