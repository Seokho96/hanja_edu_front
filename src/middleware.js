import { push } from "react-router-redux";
import { createBrowserHistory } from 'history';
import agent from "./agent";
import { APP_TOKEN } from "./reducers/common";
import { LOGIN, LOGOUT } from "./reducers/member";
import { replaceStage } from "./utils/common";
import Alert from './utils/Alert';


const history = createBrowserHistory();

const promiseMiddleware = (store) => (next) => (action) => {
  if (isPromise(action.payload)) {
    // api 요청건
    action.payload.then(
      (res) => {
        
        if ((res && !res?.data ) || res.data.code !== '0000') {
          action.error = true;
          
        } else if (res && res.result && action.stop) {
          // stop 이면 완료건도 중단(reducer 진입 안함)
          if (res.message) Alert.info(res.message);
          return;
        }

        action.payload = res;
        next(action);
      },
      (error) => {
        action.error = true;
        action.payload = error;

        if (error.message) Alert.info(error.message);
      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = (store) => (next) => (action) => {
  if (
    action.type === LOGIN ||
    action.type === APP_TOKEN ||
    action.type === "CONNECT_NOTE"
  ) {
   
    if (!action.error) {
      agent.setInfo({ mode: "login", ...action.payload.data.result });
       // eslint-disable-next-line no-debugger
    debugger

      if (action.type === LOGIN || action.type === APP_TOKEN) {
        agent.setToken(action.payload.data.result.accessToken);
        // agent.setAutoLoginToken(action.payload.data.info.alt);
        // history.pushState(null, null, '/home')
        // store.dispatch(push("/home"));
        window.location.href = "/home"
      }
    } else {
      // eslint-disable-next-line no-debugger
      // 자동로그인 에러 발생 시 처리
      // eslint-disable-next-line no-lonely-if
      if (action.type === APP_TOKEN) {
        agent.clearAuth();
        store.dispatch(push("/login"));
      } 

      if(action.payload.data.code !== '0000'){
        Alert.info(action.payload.data.message)
      }
    }
  } else if (action.type === LOGOUT) {
    agent.clearAuth();
  }

  next(action);
};

const authMiddleware = (store) => (next) => (action) => {
  next(action);
};

function isPromise(v) {
  return v && typeof v.then === "function";
}

export { promiseMiddleware, localStorageMiddleware, authMiddleware };
