function tooltip_typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    tooltip_typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    tooltip_typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return tooltip_typeof(obj);
}