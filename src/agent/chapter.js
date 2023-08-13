import  requests  from "./requets";

export default {
    insertChaptersByExcel:(param) => requests.post('/chapter/excel', param),
    insertChapterDetailsByExcel:(param) => requests.post('/chapter/detail/excel', param),
    getChaptetDetail:(params) => requests.get('/chapter/detail', {params}),

}