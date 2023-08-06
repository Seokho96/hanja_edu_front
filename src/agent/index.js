import Quiz from "./quiz";
import User from "./user";
import Chapter from "./chapter";
import Common from "./common";


export default {
  Quiz,
  User,
  Chapter,
  Common,
  
  getSessionInfo: () => {
    const info = {};
    // let key = "";

    // const keys = Object.keys(window.sessionStorage);

    // for (let i = 0; i < keys.length; i += 1) {
    //   if (keys[i] === "accessToken") key = "token";
    //   else if (keys[i] === "app") key = "isApp";
    //   else key = keys[i];

    //   info[key] = JSON.parse( window.sessionStorage.getItem('USER'))[key];
    // }

    return JSON.parse( window.sessionStorage.getItem('USER'));
  },

  setToken: (token) => {
    window.sessionStorage.setItem("accessToken", token);
  },

  setAutoLoginToken: (token) => {
    if (token !== null) {
      if (window.NativeStorage) {
        window.NativeStorage.setItem(
          "alt",
          token,
          (res) => {
            console.log("success :", res);
          },
          (err) => {
            console.log("err :", err);
          }
        );
      }
    }
  },

  setInfo: (info) => {
    const keys = Object.keys(info);
    const userInfo = {}
    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] !== "alt") {
        userInfo[keys[i]] = info[keys[i]];
        if(keys[i] === 'accessToken')
        window.sessionStorage.setItem('accessToken', info[keys[i]]);
      }
    }
    window.sessionStorage.setItem('USER', JSON.stringify(userInfo));
  },

};
