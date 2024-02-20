function Portal_getPrototypeOf(o) {
  Portal_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return Portal_getPrototypeOf(o);
}