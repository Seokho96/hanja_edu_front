import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import member from "./reducers/member";

const createRootReducer = (history) =>
  combineReducers({
    member,
    router: connectRouter(history)
  })

  export default createRootReducer;

