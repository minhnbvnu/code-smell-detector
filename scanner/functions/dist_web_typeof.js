function dist_web_typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    dist_web_typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    dist_web_typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return dist_web_typeof(obj);
}