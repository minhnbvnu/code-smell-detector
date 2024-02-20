function Checkbox_typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    Checkbox_typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    Checkbox_typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return Checkbox_typeof(obj);
}