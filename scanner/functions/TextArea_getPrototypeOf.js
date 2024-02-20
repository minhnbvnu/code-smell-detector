function TextArea_getPrototypeOf(o) {
  TextArea_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return TextArea_getPrototypeOf(o);
}