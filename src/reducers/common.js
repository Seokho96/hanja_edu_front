const defaultState = {
    isLogin: false,
    active: "",
    loading: false,
  };
  
  export const ASYNC_START = "ASYNC_START";
  export const ASYNC_END = "ASYNC_END";
  export const APP_TOKEN = "APP_TOKEN";
  
  
  export default (state = defaultState, action) => {
    switch (action.type) {
  
      case ASYNC_START:
        return { ...state, loading: true };
  
      case ASYNC_END:
        return { ...state, loading: false };
    
      case APP_TOKEN:
        return {
          ...state,
          info: action.payload.info,
          code: action.payload.code,
        };
      default:
        return state;
    }
  };
  