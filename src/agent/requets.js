import axios from 'axios'
import agent from '.';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER  }/api`,
  withCredentials: true,
  
})

instance.defaults.headers.common['Content-Type'] = 'application/json';


/*
    1. 요청 인터셉터를 작성합니다.
    2개의 콜백 함수를 받습니다.

    1) 요청 바로 직전 - 인자값: axios config
    2) 요청 에러 - 인자값: error
*/
instance.interceptors.request.use(
  (config) => {
    // 요청 바로 직전
    // axios 설정값에 대해 작성합니다.
    // console.log('axios.js request : ', config)

    // const users = useUsersStore()
    // const { grantType, accessToken } = users.getUserInfo

    // if (users.getUserInfo?.accessToken) {
    //   config.headers['Authorization'] = grantType + ' ' + accessToken
    // }

    const {grantType, accessToken:token} = agent.getSessionInfo()
    console.log(`${grantType  } ${  token}` )

  if (token) {
    console.log(`${grantType  } ${  token}` )
    config.headers.Authorization = `${grantType  } ${  token}`
  }
     return config 
    }
  ,
  (error) => 
    // 요청 에러 처리를 작성합니다.
     Promise.reject(error)
  
)

/*
    2. 응답 인터셉터를 작성합니다.
    2개의 콜백 함수를 받습니다.

    1) 응답 정상 - 인자값: http response
    2) 응답 에러 - 인자값: http error
*/
instance.interceptors.response.use(
  (res) => 
    /*
        http status가 200인 경우
        응답 바로 직전에 대해 작성합니다. 
        .then() 으로 이어집니다.
    */
    // console.log('axios.js response : ', res)
     res
  ,
  (error) => 
    /*
        http status가 200이 아닌 경우
        응답 에러 처리를 작성합니다.
        .catch() 으로 이어집니다.    
    */
    
     Promise.reject(error)
  
)

// 생성한 인스턴스를 익스포트 합니다.
export default instance
