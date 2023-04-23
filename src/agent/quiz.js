import  requests  from "./requets";

export default {
    test:( )=> requests.get('/school/test', {params:{ userId:'a', password:'b'} }),

}