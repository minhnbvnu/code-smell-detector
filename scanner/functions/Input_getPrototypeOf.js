function Input_getPrototypeOf(o) {
  Input_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return Input_getPrototypeOf(o);
}