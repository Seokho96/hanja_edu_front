import axios from "axios";
import Alert from 'sweetalert2';
import { getConfig, replaceStage } from "../utils/common";

export const headerForm = {
  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  Accept: "*/*",
};

// 토큰 추가
const configToken = function (config) {
  const token = window.sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;

    // 장부 진입 이후일 때 header에 장부번호 추가
    const biSeq = window.sessionStorage.getItem("biSeq");

    if (biSeq) {
      config.headers.biSeq = biSeq;
    }
  }


  return config;
};

// 요청 오류
const reqError = function (error) {
  const { method, url, params, data, headers } = error.config;

  // sentry log 기록용
  // Sentry.setContext("API Request Detail", {
  //   method,
  //   url,
  //   params,
  //   data,
  //   headers,
  // });

  return Promise.reject(error);
};

// 상태코드 200인 경우
const repSuccess = function (rep) {

  const d = rep.data;

  if (d.result === false) {
    if (d.code === "3002") {
      replaceStage("/m/choice");
      return;
    }

    Alert.info(d.message);
  }

  // eslint-disable-next-line consistent-return
  return d;
};

const repError = function (error) {

  const d = error.response.data;

  if (d.result === false) {
    Alert.info(d.message);
  }

  const { data, status } = error.response;

  // sentry log 기록용
  // Sentry.setContext("API Response Detail", {
  //   status,
  //   data,
  // });

  return Promise.reject(error);
};

// 토큰 요청
export const requests = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

requests.interceptors.request.use();
requests.interceptors.response.use(repSuccess, repError);
