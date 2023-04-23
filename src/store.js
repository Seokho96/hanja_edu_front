import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import {
  promiseMiddleware,
  localStorageMiddleware,
  authMiddleware,
} from "./middleware";
import createRootReducer from "./reducer";

// router 설정관련

// 히스토리 생성(네비게이션 관리를 위한 생성)
export const history = createBrowserHistory();

// 라우트 미들웨어 등록
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => 
  
    // 개발환경시 로그 사용(developement)
     applyMiddleware(
      myRouterMiddleware,
      promiseMiddleware,
      localStorageMiddleware,
      authMiddleware,
      createLogger()
    );
  


export const store = createStore(
  createRootReducer(history),
  composeWithDevTools(getMiddleware())
);
