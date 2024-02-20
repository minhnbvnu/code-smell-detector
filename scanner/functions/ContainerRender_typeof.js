function ContainerRender_typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    ContainerRender_typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    ContainerRender_typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return ContainerRender_typeof(obj);
}