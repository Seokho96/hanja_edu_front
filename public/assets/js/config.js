let SCRAP_SERVER = "";
let real;
// var SERVICE_NM = "success";
let WEB_CLIENT_ID = "";
let SUCCESS_API = "";
let MESSAGE_API = "";

if (window.location.host.indexOf("gplatform.co.kr") !== -1) {
  // real
  real = true;
  SCRAP_SERVER = "https://scrap.xn--ob0bs79awa206c7ov.com";
  SUCCESS_API = "http://salary.gplatform.co.kr";
  WEB_CLIENT_ID =
    "153138468190-00scpg46g08mntr6vcvt9g7id0sviocc.apps.googleusercontent.com";
  MESSAGE_API = "http://192.168.0.57:3002";
} else {
  // dev
  real = false;
  SUCCESS_API = "https://52.78.30.127:8081";
}
