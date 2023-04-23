/* eslint-disable prefer-rest-params */
import Swal from "sweetalert2";
import $ from "jquery";

export default {
  info () {
    // text, opts
    let _opts = {
      title: "",
      confirmButtonText: "확인",
    };

    if (_opts.type === "input") delete _opts.type;

    _opts = this.setConfig(arguments, _opts);

    this.executeAlert(_opts);
  },

  confirm () {
    // text, title, opts
    let _opts = {
      title: "",
      ajax: true,
      showCancelButton: true ,
      cancelButtonText: "취소",
      confirmButtonText: "확인",
      confirmButtonColor: "#dd6b55",
    };

    if (_opts.type === "input") delete _opts.type;

    _opts = this.setConfig(arguments, _opts);

    this.executeAlert(_opts);
  },

  prompt() {
    let _opts = {
      title: "",
      showCancelButton: true ,
      cancelButtonText: "취소",
      confirmButtonText: "확인",
      confirmButtonColor: "#dd6b55",
    };

    _opts = this.setConfig(arguments, _opts);

    _opts.type = "input"; // input

    this.executeAlert(_opts);
  },

  setConfig(arg, _opts) {
    if (arg.length >= 1) {
      // 본문
      $.extend(_opts, {
        text: arg[0],
      });
    }

    if (arg.length >= 2) {
      // 상세옵션 or 콜백함수
      if (typeof arg[1] === "function") {
        $.extend(_opts, {
          callback: arg[1],
        });
      } else if (arg[1] instanceof Object === true) {
        $.extend(_opts, arg[1]);
      }
    }

    if (arg.length === 3) {
      // 상세옵션 or 콜백함수
      if (typeof arg[2] === "function") {
        $.extend(_opts, {
          callback: arg[2],
        });
      } else if (arg[2] instanceof Object === true) {
        $.extend(_opts, arg[2]);
      }
    }

    return _opts;
  },

  executeAlert(opts) {
    if (opts.callback !== undefined) {
      if (opts.ajax !== undefined && opts.ajax === true) {
        opts.showLoaderOnConfirm = true;
        opts.closeOnConfirm = false;
      }

      // settimeout 걸지않으면 로딩표시가 제거되지않음
      const len = opts.callback.length;

      let _callback = null;
      if (len === 0) {
        _callback = function () {
          // isConfirm
          setTimeout(() => {
            opts.callback(); // isConfirm
          }, 300);
        };
      } else {
        _callback = function (st) {
          // isConfirm
          setTimeout( () =>{
            opts.callback(st); // isConfirm
          }, 300);
        };
      }

      Swal.fire(opts).then((result) => {
        _callback(result);
      });
    } else {
      Swal.fire(opts);
    }
  },
};
