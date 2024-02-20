function TextArea_typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    TextArea_typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    TextArea_typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return TextArea_typeof(obj);
}