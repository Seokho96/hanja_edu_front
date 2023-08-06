import  requests  from "./requets";

export default {
    getCommonCode:(params) => requests.get('/common/code', {params}),
}