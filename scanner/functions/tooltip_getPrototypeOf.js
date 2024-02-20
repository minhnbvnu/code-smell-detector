function tooltip_getPrototypeOf(o) {
  tooltip_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return tooltip_getPrototypeOf(o);
}