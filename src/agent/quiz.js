import  requests  from "./requets";

export default {
    test:( )=> requests.get('/school/test', {params:{ userId:'a', password:'b'} }),
    insertQuestionByExcel:(param) => requests.post('/question/excel', param),
    insertQuizByExcel:(param) => requests.post('/quiz/excel', param),
    getQuizList:(params) => requests.get('/question/', {params})
}