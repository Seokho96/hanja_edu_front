import Quiz from "./quiz";


export default {
  Quiz,


  getSessionInfo: () => {
    const info = {};
    let key = "";

    const keys = Object.keys(window.sessionStorage);

    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] === "accessToken") key = "token";
      else if (keys[i] === "app") key = "isApp";
      else key = keys[i];

      info[key] = window.sessionStorage.getItem(keys[i]);
    }

    return info;
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
    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] !== "alt") {
        window.sessionStorage.setItem(keys[i], info[keys[i]]);
      }
    }
  },

};
