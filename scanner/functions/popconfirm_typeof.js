function popconfirm_typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    popconfirm_typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    popconfirm_typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return popconfirm_typeof(obj);
}