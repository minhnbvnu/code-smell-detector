function switch_getPrototypeOf(o) {
  switch_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return switch_getPrototypeOf(o);
}