import React from "react";
import agent from "../agent";

export const onMoveBook = (evt) => {
  // evt 가 문자열 (주소)
  if (typeof evt === "string") {
    historyManager.push(evt);
  }
};

export const changeStage = (path, state) => {
  if (window.location.pathname === path) return;

  historyManager.push(path, state);
};

// 뒤로가기 무시해야 할 때 사용
export const changeStageSkip = (path, num) => {
  if (window.location.pathname === path) return;

  historyManager.push(num);
  window.history.push(path);
};

export const closeStage = (path, e) => {
  if (e) e.preventDefault();

  if (window.location.pathname === path) return;

  historyManager.push(path);
};

export const replaceStage = (path, state) => {
  if (window.location.pathname === path) return;

  window.history.replace(path, state);
};

export const loading = () => <div>LOADING ...</div>;

window.historyList = [];

export const historyManager = {
  init: () => {
    window.onpopstate = () => {
      if (window.historyList.length) {
        const fnc = window.historyList.pop();
        // console.log("######################## history cnt : " + window.historyList.length + ", pop path : " + window.location.pathname);

        if (typeof fnc === "function") {
          fnc();
          // console.log("########################")
          // console.log(fnc)
          // console.log("########################")
        } else if (typeof fnc === "number") {
          window.history.goBack(fnc);
        }
      }
      window.Alert.close();

      // 뒤로가기시 추가 콜백
      if (typeof window.callBackward === "function") {
        window.callBackward();
      }
    };
  },
  push: (callback, state) => {
    if (typeof callback === "string") {
      window.historyList.push(null);
      window.history.push({ pathname: callback, state });
      // console.log("######################## 1.history cnt : " + window.historyList.length + ", push path : " + callback);
    } else if (typeof callback === "number") {
      window.historyList.push(callback);
      // console.log("######################## 1.history cnt : " + window.historyList.length + ", push path : " + callback);
    } else {
      window.historyList.push(callback);
      const path = window.location.pathname;
      window.history.push({ pathname: path, state });
      // console.log("######################## 2.history cnt : " + window.historyList.length + ", push path : " + path);
    }
  },
  pop: () => {
    window.historyList.pop();
  },
};

// eslint-disable-next-line consistent-return
export const getParameters = (paramName) => {
  // 리턴값을 위한 변수 선언
  let returnValue;

  // 현재 URL 가져오기
  const url = window.location.href;

  // get 파라미터 값을 가져올 수 있는 ? 를 기점으로 slice 한 후 split 으로 나눔
  const parameters = url.slice(url.indexOf("?") + 1, url.length).split("&");

  // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
  for (let i = 0; i < parameters.length; i += 1) {
    const varName = parameters[i].split("=")[0];
    if (varName.toUpperCase() === paramName.toUpperCase()) {
      returnValue = parameters[i].split("=")[1];
      return decodeURIComponent(returnValue);
    }
  }
};


export const getConfig = (key) => `${window[key]}/api`;

// 앱
export const native = () => {
  let cmd = {};

  const { isApp } = agent.getSessionInfo();

  cmd = {
    // 설치 앱 버전
    // cbVersion(param) > param = {data: {version: xx}}
    ver: () => {
      if (isApp) window.location.href = `${window.SCRAP_SCHEME}://callVersion`;
    },

    // 설치된 인증서 목록
    // cbCertList(param) > param = {data: {subjectName:'', serialNumber: '', notAfter:'', notBefore: ''}}
    certList: () => {
      if (isApp) window.location.href = `${window.SCRAP_SCHEME}://callcertList`;
    },

    // 인증번호 받기(인증서 복사)
    // cbCopyCertNum(param) > param = {uid: ''}
    copyCertNum: () => {
      if (isApp)
        window.location.href = `${window.SCRAP_SCHEME}://callCopyCertNum`;
    },

    // 인증서 가져오기
    // cbCopyCert(param) > param = {cert: {serialNumber: ''}}
    copyCert: (uid, isSave) => {
      if (isApp)
        window.location.href =
          `${window.SCRAP_SCHEME
          }://callCopyCert?uid=${uid
          }&isSave=${isSave}`;
    },

    // 인증서 삭제
    // cbDeleteCert(param)
    deleteCert: (idx) => {
      if (isApp)
        window.location.href =
          `${window.SCRAP_SCHEME}://callDeleteCert?idx=${idx}`;
    },

    // json 데이터 저장
    // cbSaveData(param)
    saveData: (key, json) => {
      if (isApp)
        window.location.href =
          `${window.SCRAP_SCHEME
          }://callSaveData?key=${key
          }&inJson=${JSON.stringify(json)}`;
    },

    // json 데이터 삭제
    // cbQueryRemove(param)
    deleteData: (key) => {
      if (isApp)
        window.location.href =
          `${window.SCRAP_SCHEME}://callQueryRemove?key=${key}`;
    },

    // json 데이터 조회
    // cbQueryKeys(param) > param = {data: [{key:'CERT', data:[{serialNumber:'', pwd: ''}]},{key:'', data:[{key:jseq, serialNumber:''}]}]}
    loadData: () => {
      if (isApp)
        window.location.href = `${window.SCRAP_SCHEME}://callQueryKeys`;
    },

    // 데이터 암호화
    // cbEnvParam(param) > param.envParam
    encData: (param) => {
      if (isApp)
        window.location.href =
          `${window.SCRAP_SCHEME}://callEnvParam?param=${param}`;
    },

    // 인증서 비밀번호 확인
    // cbCertPwCheck(param)
    certPwCheck: (idx, pwd) => {
      if (isApp)
        window.location.href =
          `${window.SCRAP_SCHEME
          }://callCertPwCheck?idx=${idx
          }&pwd=${encodeURIComponent(pwd)}`;
    },

    // 권한체크
    hasPermission: (perms, cb) => {
      try {
        const { permissions } = window.cordova.plugins;
        let list = [];
        if (typeof perms === "string") {
          list.push(permissions[perms]);
        } else {
          list = perms.map((d) => permissions[d]);
        }

        permissions.hasPermission(list, (status) => {
          if (status.hasPermission) {
            if (typeof cb !== "undefined") cb(true);
          } else if (typeof cb !== "undefined") cb(false);
        });
      } catch (e) { console.log(e.message); }
    },

    // 권한부여
    requestPermission: (perms, cb) => {
      try {
        const { permissions } = window.cordova.plugins;
        let list = [];
        if (typeof perms === "string") {
          list.push(permissions[perms]);
        } else {
          list = perms.map((d) => permissions[d]);
        }

        permissions.requestPermissions(list, (status) => {
          if (status.hasPermission) {
            if (typeof cb !== "undefined") cb(true);
          } else if (typeof cb !== "undefined") cb(false);
        });
      } catch (e) { console.log(e.message); }
    },
  };

  return cmd;
};

/**
 * 앱 데이터 저장/조회/삭제
 * @param {JASAN or CERT} kind
 * @param {cbQueryKeys를 통해 받은 [{key: "JASAN", data: [{}]}, {key: "CERT", data: [{}]} ]값} dataArr
 * @param {true: dataArr 값이 즉 data, false: dataArr에서 해당 kind로 찾음} flag
 */
export const appData = (kind, dataArr, flag) => {
  let rtn = {};

  let data = [];
  if (flag) {
    data = [...dataArr];
  } else {
    for (let i = 0; i < dataArr.length; i += 1) {
      if (dataArr[i].key === kind) {
        try {
          data = JSON.parse(dataArr[i].data);
        } catch (e) {
          data = dataArr[i].data;
        }
        break;
      }
    }
  }

  if (kind === "CERT") {
    // [{serialNumber: 'xxxx', pwd: 'xxx'},{serialNumber: 'xxxx', pwd: 'xxx'}]
    rtn = {
      get: (serialNumber) => {
        if (!serialNumber) {
          // 전체조회
          return data || [];
        }
        if (data.length === 0) return null;

        for (let i = 0; i < data.length; i += 1) {
          if (data[i] && data[i].serialNumber === serialNumber) return data[i];
        }

        return null;

      },

      set: (item) => {
        const { serialNumber } = item;
        let isExists = false;

        // 기존에 있으면 갱신
        for (let i = 0; i < data.length; i += 1) {
          if (data[i] && data[i].serialNumber === serialNumber) {
            data[i] = item;
            isExists = true;
            break;
          }
        }

        // 없으면 등록
        if (!isExists) data.push(item);

        native().saveData(kind, data);
      },

      remove: (serialNumber) => {
        if (data.length !== 0) {
          for (let i = 0; i < data.length; i += 1) {
            if (data[i] && data[i].serialNumber === serialNumber)
              data.splice(i, 1);
          }

          native().saveData(kind, data);
        }
      },
    };
  } else if (kind === "JASAN") {
    // [{key: jSeq, serialNumber: 'xxxx'},{key: jSeq, serialNumber: 'xxxx'}]
    rtn = {
      get: (val) => {
        if (!val) {
          // 전체조회
          return data || [];
        }
        if (data.length === 0) return null;

        for (let i = 0; i < data.length; i += 1) {
          if (data[i] && data[i].key === val) return data[i];
        }

        return null;

      },

      set: (item) => {
        let items = item;
        if (item instanceof Array === false) {
          items = [item];
        }

        for (let i = 0; i < items.length; i += 1) {
          const { key } = items[i];
          let isExists = false;

          // 기존에 있으면 갱신
          for (let j = 0; j < data.length; j += 1) {
            if (data[j] && data[j].key === key) {
              data[j] = items[i];
              isExists = true;
              break;
            }
          }

          // 없으면 등록
          if (!isExists) data.push(items[i]);
        }

        native().saveData(kind, data);
      },

      // eslint-disable-next-line consistent-return
      remove: (val) => {
        if (data.length !== 0) {
          for (let i = data.length - 1; i >= 0; i -= 1) {
            if (data[i] && data[i].key === val) data.splice(i, 1);
          }

          native().saveData(kind, data);
        } else return false;
      },

      // eslint-disable-next-line consistent-return
      removeCert: (val) => {
        if (data.length === 0) {
          return false;
        }

        for (let i = data.length - 1; i >= 0; i -= 1) {
          if (data[i] && data[i].serialNumber === val) data.splice(i, 1);
        }
        native().saveData(kind, data);

      },
    };
  } else {
    rtn = {
      get: () => data,
    };
  }

  return rtn;
};

export const base64ToBlob = (base64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });

  return blob;
};

/**
 * 이미지 불러오기(권한이 필요한 경우)
 */
export const loadUrlImage = (url, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "arraybuffer";
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      const uInt8Array = new Uint8Array(xhr.response);
      let i = uInt8Array.length;
      const binaryString = new Array(i);
      // eslint-disable-next-line no-plusplus
      while (i--) {
        binaryString[i] = String.fromCharCode(uInt8Array[i]);
      }
      const data = binaryString.join("");
      const base64 = window.btoa(data);

      if (cb) cb.call(null, `data:image/jpg;base64,${base64}`);
      // this.setState({ picture: "data:image/jpg;base64," + base64 })
    }
  };
  xhr.open("GET", getConfig("SUCCESS_API") + url, true);
  xhr.setRequestHeader("access_token", agent.getSessionInfo().token); // window.sessionStorage.getItem('sct')
  xhr.send();
};

export const checkMobile = () => {
  if (/Android/i.test(navigator.userAgent)) {
    return "android";
  }
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    return "ios";
  }
  return "etc";

};





// json > query string
export const convertQueryString = (obj) => Object.keys(obj)
  .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
  .join("&");
