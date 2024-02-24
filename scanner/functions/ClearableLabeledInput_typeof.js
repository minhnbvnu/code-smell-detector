function ClearableLabeledInput_typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    ClearableLabeledInput_typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    ClearableLabeledInput_typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return ClearableLabeledInput_typeof(obj);
}