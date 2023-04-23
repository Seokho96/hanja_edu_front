export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const UNLOAD_USER_INFO = "UNLOAD_USER_INFO";
export const GET_USER_INFO = "GET_USER_INFO";

export default (state = { step: 1 }, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userInfo: action.payload,
      };
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload.data.result,
      };
    case UNLOAD_USER_INFO:
      return { step: 1 };
    default:
      return state;
  }
};
