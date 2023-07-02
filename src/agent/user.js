import  requests  from "./requets";

export default {
    login:( userId, password)=> requests.post('/auth/login', { userId, password}),

    getUserInfo:( userSeq ) => requests.get(`/user/${userSeq}`),

    insertUsersByExcel:(param) => requests.post('/user/excel', param)

}