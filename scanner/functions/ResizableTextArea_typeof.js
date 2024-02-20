function ResizableTextArea_typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    ResizableTextArea_typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    ResizableTextArea_typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return ResizableTextArea_typeof(obj);
}